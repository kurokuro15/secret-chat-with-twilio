import { useAuth, useNotifications } from 'hooks';
import placeholder from 'public/avatar.png';
import React, { useState } from 'react';
import { uploadFile } from 'services/files';
import { twMerge } from 'tailwind-merge';
import EditIcon from './icons/EditIcon';
import Avatar from './ui/Avatar';
import Spinner from './ui/Spinner';

export function UserAvatarUpload() {
  const { updateUserData, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotifications();

  async function onInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (!evt.target.files || evt.target.files.length === 0) return;

    setLoading(true);

    const file = evt.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      await uploadFile('avatars', filePath, file);
      await updateUserData({ avatar_url: filePath });
    } catch (error) {
      addNotification({ message: 'Ocurrió un error al subir tu imagen', variant: 'danger' });
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
