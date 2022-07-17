import { supabase } from 'utils/supabaseClient';

export default async function checkUsername(username: string) {
  const { data } = await supabase.from('profiles').select('username').eq('username', username);
  return data && data[0] ? false : true;
}
