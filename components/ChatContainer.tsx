import { Conversation, Message } from '@twilio/conversations';
import { useEffect, useRef, useState } from 'react';
import ChatMessageContainer from './ChatMessangeContainer';
import { useAuth } from 'hooks';

export default function ChatContainer({ conversation }: { conversation: Conversation }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const author = messages[messages.length - 1]?.author;
    console.log(author);
    if (author === user?.username) divRef.current?.scrollTo({ top: divRef.current.scrollHeight });
  }, [messages, user]);

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
