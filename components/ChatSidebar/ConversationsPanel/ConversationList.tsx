import { Conversation } from '@twilio/conversations';
import { useConversationsCtx } from 'contexts/ConversationsCtx';
import { useSidebarCtx } from 'contexts/SidebarCtx';
import ConversationItem from './ConversationItem';

interface ConversationListProps {
  conversations: Conversation[];
}

function ConversationList({ conversations }: ConversationListProps) {
  const { selectConversation, selectedConversation } = useConversationsCtx();
  const { toggleSidebar } = useSidebarCtx();

  return (
    <div className="w-full flex flex-col" role="rowgroup">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.sid}
          name={conversation.friendlyName}
          onClick={async () => {
            await selectConversation(conversation);
            // 1024px comes from tailwindcss lg breakpoint
            if (window.innerWidth < 1024) {
              toggleSidebar();
            }
          }}
          selected={!!selectedConversation && conversation.sid === selectedConversation.sid}
          role="row"
        />
      ))}
    </div>
  );
}

export default ConversationList;
