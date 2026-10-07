/**
 * Dynamind Studios — Sovereign Offline-First Reactive Storage Engine
 * Utiliza IndexedDB nativo con fallback resiliente a localStorage.
 * Almacenes aislados: leads_vault, objections_vault, cms_vault, audit_vault y sync_queue.
 */

const DB_NAME = 'dynamind_offline_vault';
const DB_VERSION = 1;
const STORES = ['leads_vault', 'objections_vault', 'cms_vault', 'audit_vault', 'sync_queue'];

// Mapa de suscriptores reactivos en memoria
const subscribers = new Map();

function getDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      STORES.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          if (storeName === 'sync_queue') {
            db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
          } else {
            db.createObjectStore(storeName);
          }
        }
      });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Obtener un valor del almacén de IndexedDB con fallback seguro
 */
export async function getStoreItem(storeName, key = 'data', fallbackValue = null) {
  try {
    const db = await getDB();
    return new Promise((resolve) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);

      req.onsuccess = () => {
        if (req.result !== undefined) {
          resolve(req.result);
        } else {
          // Intentar fallback si no existe aún en IndexedDB
          try {
            const raw = localStorage.getItem(`dynamind_${storeName}`);
            resolve(raw ? JSON.parse(raw) : fallbackValue);
          } catch {
            resolve(fallbackValue);
          }
        }
      };

      req.onerror = () => {
        try {
          const raw = localStorage.getItem(`dynamind_${storeName}`);
          resolve(raw ? JSON.parse(raw) : fallbackValue);
        } catch {
          resolve(fallbackValue);
        }
      };
    });
  } catch (err) {
    try {
      const raw = localStorage.getItem(`dynamind_${storeName}`);
      return raw ? JSON.parse(raw) : fallbackValue;
    } catch {
      return fallbackValue;
    }
  }
}

/**
 * Guardar un valor en el almacén de IndexedDB y notificar a los suscriptores
 */
export async function setStoreItem(storeName, value, key = 'data') {
  // Sincronizar en localStorage como espejo de respaldo inmediato
  try {
    localStorage.setItem(`dynamind_${storeName}`, JSON.stringify(value));
  } catch (e) {
    // Si localStorage excede su cuota, IndexedDB seguirá funcionando sin problemas
  }

  try {
    const db = await getDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(value, key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn(`IndexedDB write error for ${storeName}, mirrored in localStorage:`, err);
  }

  // Notificar a observadores locales
  const callbacks = subscribers.get(storeName);
  if (callbacks) {
    callbacks.forEach(cb => {
      try { cb(value); } catch (e) {}
    });
  }

  return value;
}

/**
 * Suscribirse a cambios reactivos de un store específico
 */
export function subscribeStore(storeName, callback) {
  if (!subscribers.has(storeName)) {
    subscribers.set(storeName, new Set());
  }
  subscribers.get(storeName).add(callback);

  return () => {
    const set = subscribers.get(storeName);
    if (set) {
      set.delete(callback);
    }
  };
}

/**
 * Encolar una tarea de sincronización para cuando haya red (Offline-First Sync)
 */
export async function enqueueSyncTask(action, payload) {
  const task = {
    action,
    payload,
    created_at: new Date().toISOString()
  };

  try {
    const db = await getDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction('sync_queue', 'readwrite');
      const store = tx.objectStore('sync_queue');
      const req = store.add(task);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.info('Offline task enqueued in localStorage fallback');
    try {
      const q = JSON.parse(localStorage.getItem('dynamind_sync_queue') || '[]');
      q.push(task);
      localStorage.setItem('dynamind_sync_queue', JSON.stringify(q));
    } catch {}
  }
}

/**
 * Vaciar la cola de sincronización hacia Supabase
 */
export async function flushSyncQueue(executor) {
  if (typeof navigator !== 'undefined' && !navigator.onLine) return;

  try {
    const db = await getDB();
    const tasks = await new Promise((resolve) => {
      const tx = db.transaction('sync_queue', 'readonly');
      const store = tx.objectStore('sync_queue');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });

    if (tasks.length === 0) return;

    for (const task of tasks) {
      try {
        await executor(task);
        // Eliminar tarea procesada
        const deleteTx = db.transaction('sync_queue', 'readwrite');
        deleteTx.objectStore('sync_queue').delete(task.id);
      } catch (err) {
        console.warn('Sync task execution failed, will retry later:', err);
        break; // Detener en caso de fallo de red
      }
    }
  } catch (err) {
    console.warn('Error flushing sync queue:', err);
  }
}
