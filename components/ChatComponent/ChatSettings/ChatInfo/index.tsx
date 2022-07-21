import { Conversation } from '@twilio/conversations';
import AvatarInput from 'components/AvatarUpload';
import Avatar from 'components/ui/Avatar';
import { useNotifications } from 'hooks';
import { useState } from 'react';
import { uploadFile } from 'services/files';
import getAvatarUrl from 'services/getAvatarUrl';
import ChatNameForm from './ChatNameForm';

export function ChatInfo({
  conversation,
  attributes,
  isAdmin
}: {
  conversation: Conversation;
  attributes: any;
  isAdmin: boolean;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { addNotification } = useNotifications();
  return (
    <div className="flex gap-5 items-center">
      {isAdmin ? (
        <AvatarInput
          onChange={async (path, file) => {
            await uploadFile('avatars', path, file);
            try {
              const url = getAvatarUrl(path);
              await conversation.updateAttributes({
                avatar_url: url
              });
              setAvatarUrl(url);
            } catch (error) {
              addNotification({ message: 'Hubo un error al subir la imagen', variant: 'danger' });
            }
          }}
          imgSrc={avatarUrl ?? attributes.avatar_url}
          className="shadow-md shrink-0"
        />
      ) : (
        <Avatar src={attributes.avatar_url} className="w-20 h-20 shrink-0" />
      )}
      <div>
        {isAdmin ? (
          <ChatNameForm conversation={conversation} />
        ) : (
          <p>{conversation.friendlyName}</p>
        )}
      </div>
    </div>
  );
}
