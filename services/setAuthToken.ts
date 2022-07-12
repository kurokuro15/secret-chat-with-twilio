import { supabase } from 'utils/supabaseClient';

export default async function setAuthToken(
  ...[event, session]: Parameters<Parameters<typeof supabase.auth.onAuthStateChange>[0]>
) {
  await fetch('/api/auth/set', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session })
  });
}
