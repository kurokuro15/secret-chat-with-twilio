import { Conversation } from '@twilio/conversations';
import Avatar from 'components/ui/Avatar';
import { useConversations } from 'hooks';
import imgPlaceholder from 'public/avatar.png';
import { twMerge } from 'tailwind-merge';

interface ConversationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  conversation: Conversation;
}

function ConversationItem({ conversation, ...props }: ConversationItemProps) {
  const { attributes } = conversation;
  const { avatar_url } = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;
  const { selectedConversation } = useConversations();
  const selected = selectedConversation === conversation;

  return (
    <div
      className={twMerge(
        'flex gap-5 items-center py-3 px-2 bg-white hover:bg-purple-100 font-bold cursor-pointer transition-all',
        selected && 'bg-purple-200 hover:bg-purple-200'
      )}
      {...props}
    >
      <Avatar src={avatar_url ?? imgPlaceholder} className="shrink-0 shadow-md" />
      <div className="grow truncate">{conversation.friendlyName}</div>
    </div>
  );
}

export default ConversationItem;
