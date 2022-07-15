import { Conversation } from '@twilio/conversations';
import { useConversationsCtx } from 'contexts/ConversationsCtx';
import ConversationItem from './ConversationItem';

interface ConversationListProps {
  conversations: Conversation[];
}

function ConversationList({ conversations }: ConversationListProps) {
  const { selectConversation, selectedConversation } = useConversationsCtx();

  return (
    <div className="w-full flex flex-col">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.sid}
          name={conversation.friendlyName}
          onClick={() => selectConversation(conversation)}
          selected={!!selectedConversation && conversation.sid === selectedConversation.sid}
        />
      ))}
    </div>
  );
}

export default ConversationList;
