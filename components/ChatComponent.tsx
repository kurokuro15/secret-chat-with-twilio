import { useConversations } from 'hooks';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

export function ChatComponent() {
  const { selectedConversation } = useConversations();
  if (!selectedConversation) return null;
  return (
    <>
      <ChatHeader />
      <ChatContainer />
      <div className="grow-0 inset-x-0 bottom-0 justify-center">
        <ChatInput />
      </div>
    </>
  );
}
