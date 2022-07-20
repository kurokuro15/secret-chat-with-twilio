import { supabase } from 'utils/supabaseClient';

export default async function getAvatarByUsername(username: string) {
  const { data } = await supabase.from('profiles').select('avatar_url').eq('username', username);
  if (data && data[0]) {
    const userAvatarUrl = data[0].avatar_url;
    return supabase.storage.from('avatars').getPublicUrl(userAvatarUrl).publicURL || null;
  }
}
