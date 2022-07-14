import { Conversation } from '@twilio/conversations';
import ConversationItem from './ConversationItem';

interface ConversationListProps {
  conversations: Conversation[];
}

function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="w-full flex flex-col">
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.sid} name={conversation.friendlyName} />
      ))}
    </div>
  );
}

export default ConversationList;
