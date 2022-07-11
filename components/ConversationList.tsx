import { Conversation } from '@twilio/conversations';
import ConversationItem from './ConversationItem';

interface ConversationListProps {
  conversations: Conversation[];
}

function ConversationList({ conversations }: ConversationListProps) {
  return (
    <div className="w-full h-full flex flex-col divide-y divide-purple-400">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.uniqueName}
          name={conversation.uniqueName}
        ></ConversationItem>
      ))}
    </div>
  );
}

export default ConversationList;
