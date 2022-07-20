import { supabase } from 'utils/supabaseClient';

export default function getAvatarUrl(avatarUrl: string) {
  return supabase.storage.from('avatars').getPublicUrl(avatarUrl).publicURL || null;
}
