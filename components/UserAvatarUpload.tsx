import { useAuthCtx } from 'contexts/AuthCtx';
import placeholder from 'public/photo.jpg';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { supabase } from 'utils/supabaseClient';
import Avatar from './Avatar';
import EditIcon from './icons/EditIcon';
import Spinner from './Spinner';

export function UserAvatarUpload() {
  const { updateUserData, user } = useAuthCtx();
  const [loading, setLoading] = useState(false);

  async function onInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    if (!evt.target.files || evt.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }

    const file = evt.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage.from('avatars').upload(filePath, file);

    if (!error) {
      await updateUserData({ avatar_url: filePath });
    }
    setLoading(false);
  }

  return (
    <label
      className="group relative cursor-pointer rounded-full overflow-hidden"
      title="Cambiar imagen"
    >
      <div
        className={twMerge(
          !loading && 'invisible',
          'bg-black/50 backdrop-blur-sm transition-all group-hover:visible absolute flex items-center justify-center w-full h-full z-10'
        )}
      >
        {loading ? <Spinner /> : <EditIcon className="text-white" />}
      </div>
      <Avatar src={user?.avatar_url ?? placeholder} className="w-20 h-20" />
      <input
        type="file"
        accept="image/gif,image/jpeg,image/jpg,image/png"
        onChange={(evt) => onInputChange(evt)}
        hidden
      />
    </label>
  );
}
