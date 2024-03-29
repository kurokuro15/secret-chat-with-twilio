import { Conversation } from '@twilio/conversations';
import Overlay from 'components/ui/Overlay';
import { useConversations, useSidebar } from 'hooks';
import ConversationItem from './ConversationItem';
import { ConversationItemMenu } from './ConversationItemMenu';

interface ConversationListProps {
  conversations: Conversation[];
}

function ConversationList({ conversations }: ConversationListProps) {
  const { selectConversation } = useConversations();

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
            onClick={() => {
              selectConversation(conversation);
            }}
            role="row"
            conversation={conversation}
          />
        </Overlay>
      ))}
    </div>
  );
}

export default ConversationList;
