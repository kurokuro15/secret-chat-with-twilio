import { Conversation, Message } from '@twilio/conversations';
import { useEffect, useRef, useState } from 'react';
import ChatMessageContainer from './ChatMessangeContainer';

export default function ChatContainer({ conversation }: { conversation: Conversation }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    divRef.current?.scrollTo({ top: divRef.current.scrollHeight });
  }, []);

  useEffect(() => {
    const getMsg = async () => {
      const paginator = await conversation.getMessages();
      setMessages(paginator.items);
    };
    getMsg();

    conversation.on('messageAdded', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      conversation.removeAllListeners();
    };
  }, [conversation]);

  return (
    <div ref={divRef} className="grow overflow-y-auto rounded-2xl">
      {messages.map((message) => {
        const msg: { body: string | null; author: string | null; date: Date | null } = {
          body: message.body,
          author: message.author,
          date: message.dateUpdated
        };
        return <ChatMessageContainer key={message.sid} {...msg} />;
      })}
    </div>
  );
}
