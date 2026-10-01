import { createClient } from '@supabase/supabase-js';

// =========================================================================
// SUPABASE CLIENT SINGLETONS PARA COMUNICACIÓN INSTANTÁNEA (<50ms)
// =========================================================================
export const KAL_SB = createClient(
  'https://iqddvpckxbdsiujdrjnz.supabase.co',
  'sb_publishable_Ku7k4z_DdnjNpfpc5GnU5g_3ARWOE7Y',
  { auth: { persistSession: false } }
);

export const ANDICAS_KEY = import.meta.env.VITE_ANDICAS_ANON_KEY || 'sb_publishable_andicas_anon_key';

export const ANDICAS_SB = createClient(
  'https://vkpzgtteqaekmnixrlxl.supabase.co',
  ANDICAS_KEY,
  {
    auth: { persistSession: false },
    global: {
      fetch: (url, options = {}) => {
        try {
          const u = new URL(url);
          u.searchParams.set('apikey', ANDICAS_KEY);
          const headers = new Headers(options.headers || {});
          headers.set('apikey', ANDICAS_KEY);
          headers.delete('authorization');
          headers.delete('Authorization');
          return fetch(u.toString(), { ...options, headers });
        } catch (e) {
          return fetch(url, options);
        }
      }
    }
  }
);

export const DEFAULT_CLIENT_SITES = [
  {
    id: 'kal-discobar',
    name: 'KAL DISCOBAR & VIP',
    clientCompany: 'KAL Discobar',
    domain: 'https://kal-discobar.vercel.app',
    backendUrl: 'https://kal-discobar-backend.onrender.com',
    masterKey: 'PanelPassword1966@',
    status: 'active', // 'active' | 'unpaid'
    lastCheck: new Date().toISOString(),
    features: {
      metrics: true,
      orders: true,
      menu_editor: true,
      inventory: true
    }
  },
  {
    id: 'andicas-bioparque',
    name: 'Andicas Bioparque & Cabañas',
    clientCompany: 'Andicas Eco-Resort',
    domain: 'https://andicas.vercel.app',
    backendUrl: 'https://andicas-backend.onrender.com',
    masterKey: 'PanelPassword1966@',
    status: 'active', // 'active' | 'unpaid'
    lastCheck: new Date().toISOString(),
    features: {
      bookings: true,
      recaudos: true,
      personalizacion: true,
      users_management: true,
      cancelaciones: true
    }
  }
];

export const saveAndicasToSupabase = async (status, features) => {
  const payload = {
    id: 'system_settings',
    name: 'Configuración Maestra Remota',
    type: status,
    description: typeof features === 'string' ? features : JSON.stringify(features)
  };

  try {
    await ANDICAS_SB.from('cabins').update({
      type: status,
      description: payload.description
    }).eq('id', 'system_settings');
  } catch (e) {
    console.warn('SDK update warning:', e);
  }

  try {
    await ANDICAS_SB.from('cabins').upsert(payload);
  } catch (e) {
    console.warn('SDK upsert warning:', e);
  }

  try {
    await fetch(`https://vkpzgtteqaekmnixrlxl.supabase.co/rest/v1/cabins?id=eq.system_settings&apikey=${ANDICAS_KEY}`, {
      method: 'PATCH',
      headers: {
        'apikey': ANDICAS_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ type: status, description: payload.description })
    });
  } catch (e) {
    console.warn('REST PATCH warning:', e);
  }
};

/**
 * Actualiza la contraseña del administrador del cliente en la nube sin requerir la clave actual
 * (Poder Soberano desde Dynamind Killswitch)
 */
export const updateRemoteClientPassword = async (site, newPassword) => {
  const cleanPass = String(newPassword || '').trim();
  if (!cleanPass) throw new Error('La contraseña no puede estar vacía.');

  const isKal = site.id === 'kal-discobar';
  const isAndicas = site.id === 'andicas-bioparque' || site.id?.includes('andicas');

  // 1. Sincronización KAL DISCOBAR
  if (isKal) {
    try {
      await KAL_SB
        .from('system_settings')
        .upsert({
          id: 'admin_auth',
          subscription_status: cleanPass,
          updated_at: new Date().toISOString()
        });
    } catch (err) {
      console.warn('Sync KAL Supabase password:', err);
    }

    if (site.backendUrl) {
      try {
        await fetch(`${site.backendUrl}/api/bookings/admin/update-admin-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-key': site.masterKey || 'PanelPassword1966@'
          },
          body: JSON.stringify({
            newPassword: cleanPass,
            currentKey: site.masterKey || 'PanelPassword1966@'
          })
        });
      } catch (err) {
        console.warn('Sync KAL Backend password:', err);
      }
    }
  }

  // 2. Sincronización ANDICAS / QUIMBAYAS
  if (isAndicas) {
    const payload = {
      id: 'admin_auth',
      name: 'Admin Auth Credentials',
      type: 'active',
      price_per_night: 0,
      description: cleanPass
    };

    try {
      await ANDICAS_SB.from('cabins').upsert(payload);
    } catch (err) {
      console.warn('Andicas SDK password upsert:', err);
    }

    try {
      await fetch(`https://vkpzgtteqaekmnixrlxl.supabase.co/rest/v1/cabins?id=eq.admin_auth&apikey=${ANDICAS_KEY}`, {
        method: 'PATCH',
        headers: {
          'apikey': ANDICAS_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ description: cleanPass, type: 'active' })
      });
    } catch (err) {
      console.warn('Andicas REST password patch:', err);
    }

    if (site.backendUrl) {
      try {
        await fetch(`${site.backendUrl}/api/bookings/admin/update-admin-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-key': site.masterKey || 'PanelPassword1966@'
          },
          body: JSON.stringify({
            newPassword: cleanPass,
            currentKey: site.masterKey || 'PanelPassword1966@'
          })
        });
      } catch (err) {
        console.warn('Andicas backend password update:', err);
      }
    }
  }

  return { success: true, message: `Contraseña de ${site.name} actualizada con éxito en la nube.` };
};

/**
 * Consulta la contraseña activa actualmente en la nube para un cliente remoto
 */
export const fetchRemoteClientPassword = async (site) => {
  const isKal = site.id === 'kal-discobar';
  const isAndicas = site.id === 'andicas-bioparque' || site.id?.includes('andicas');

  if (isKal) {
    try {
      const { data } = await KAL_SB.from('system_settings').select('subscription_status').eq('id', 'admin_auth').maybeSingle();
      if (data?.subscription_status) return data.subscription_status.trim();
    } catch (e) {
      console.warn('Fetch KAL pass error:', e);
    }
  }

  if (isAndicas) {
    try {
      const { data } = await ANDICAS_SB.from('cabins').select('description').eq('id', 'admin_auth').maybeSingle();
      if (data?.description) return data.description.trim();
    } catch (e) {
      console.warn('Fetch Andicas pass error:', e);
    }
  }

  return site.currentRemotePassword || site.masterKey || 'PanelPassword1966@';
};
