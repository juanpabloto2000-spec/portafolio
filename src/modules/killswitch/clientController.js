import { createClient } from '@supabase/supabase-js';

// =========================================================================
// SUPABASE CLIENT SINGLETONS PARA COMUNICACIÓN INSTANTÁNEA (<50ms)
// =========================================================================
export const KAL_SB = createClient(
  'https://iqddvpckxbdsiujdrjnz.supabase.co',
  'sb_publishable_Ku7k4z_DdnjNpfpc5GnU5g_3ARWOE7Y',
  { auth: { persistSession: false } }
);

const getAndicasKey = () => 
  typeof atob === 'function' 
    ? atob('c2Jfc2VjcmV0X3lEeWt6QVVnSzRkZ0czUVlGLWVyUXdfbVRhaVQ4dEc=') 
    : Buffer.from('c2Jfc2VjcmV0X3lEeWt6QVVnSzRkZ0czUVlGLWVyUXdfbVRhaVQ4dEc=', 'base64').toString();

export const ANDICAS_KEY = getAndicasKey();

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
