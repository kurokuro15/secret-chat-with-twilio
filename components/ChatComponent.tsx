import { useConversations } from 'hooks';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

export function ChatComponent() {
  const { selectedConversation } = useConversations();

  if (!selectedConversation) return null;

  const { friendlyName, state, attributes } = selectedConversation;
  const { avatar } = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;

  return (
    <>
      <ChatHeader title={friendlyName} status={state?.current} avatar={avatar} />
      {<ChatContainer conversation={selectedConversation} />}
      <div className="grow-0 inset-x-0 bottom-0 justify-center">
        <ChatInput />
      </div>
    </>
  );
}
