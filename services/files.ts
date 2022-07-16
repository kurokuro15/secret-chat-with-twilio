import { supabase } from 'utils/supabaseClient';

export async function uploadFile(storage: string, path: string, file: File) {
  const { error } = await supabase.storage.from(storage).upload(path, file);

  if (error) {
    throw new Error(error.message);
  }
}
