import { Conversation } from '@twilio/conversations';
import AvatarInput from 'components/AvatarUpload';
import Avatar from 'components/ui/Avatar';
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
  return (
    <div className="flex gap-5 items-center">
      {isAdmin ? (
        <AvatarInput
          onChange={async (path, file) => {
            await uploadFile('avatars', path, file);
            await conversation.updateAttributes({
              avatar_url: getAvatarUrl(path)
            });
          }}
          imgSrc={attributes.avatar_url}
          className="shadow-md"
        />
      ) : (
        <Avatar src={attributes.avatar_url} className="w-20 h-20" />
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
