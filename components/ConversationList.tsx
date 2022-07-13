import { Conversation } from '@twilio/conversations';
import ConversationItem from './ConversationItem';

interface ConversationListProps {
  conversations: Conversation[];
}

function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="w-full flex flex-col">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.uniqueName || conversation.friendlyName}
          name={conversation.uniqueName || conversation.friendlyName}
        ></ConversationItem>
      ))}
    </div>
  );
}

export default ConversationList;
