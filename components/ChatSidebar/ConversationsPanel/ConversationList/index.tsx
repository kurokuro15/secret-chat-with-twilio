import { Conversation } from '@twilio/conversations';
import Overlay from 'components/ui/Overlay';
import { useConversations, useSidebar } from 'hooks';
import ConversationItem from './ConversationItem';
import { ConversationItemMenu } from './ConversationItemMenu';

interface ConversationListProps {
  conversations: Conversation[];
}

function ConversationList({ conversations }: ConversationListProps) {
  const { selectConversation, selectedConversation } = useConversations();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full flex flex-col" role="rowgroup">
      {conversations.map((conversation) => (
        <Overlay
          content={<ConversationItemMenu conversation={conversation} />}
          key={conversation.sid}
          event="onContextMenu"
          position="bottom-center"
        >
          <ConversationItem
            name={conversation.friendlyName}
            onClick={() => {
              selectConversation(conversation);
              // 1024px comes from tailwindcss lg breakpoint
              if (window.innerWidth < 1024) toggleSidebar();
            }}
            selected={!!selectedConversation && conversation.sid === selectedConversation.sid}
            role="row"
          />
        </Overlay>
      ))}
    </div>
  );
}

export default ConversationList;
