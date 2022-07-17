import { Conversation } from '@twilio/conversations';
import { useConversations, useSidebar } from 'hooks';
import ConversationItem from './ConversationItem';

interface ConversationListProps {
  conversations: Conversation[];
}

function ConversationList({ conversations }: ConversationListProps) {
  const { selectConversation, selectedConversation } = useConversations();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full flex flex-col" role="rowgroup">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.sid}
          name={conversation.friendlyName}
          onClick={() => {
            selectConversation(conversation);
            // 1024px comes from tailwindcss lg breakpoint
            if (window.innerWidth < 1024) toggleSidebar();
          }}
          selected={!!selectedConversation && conversation.sid === selectedConversation.sid}
          role="row"
        />
      ))}
    </div>
  );
}

export default ConversationList;
