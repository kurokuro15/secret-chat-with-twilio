import { Message } from '@twilio/conversations';
import { useConversations } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import ChatMessageContainer from './ChatMessangeContainer';

export default function ChatContainer() {
  const { selectedConversation } = useConversations();

  const divRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[] | undefined>([]);

  useEffect(() => {
    divRef.current?.scrollTo({ top: divRef.current.scrollHeight });
  }, []);

  useEffect(() => {
    const getMsg = async () => {
      const paginator = await selectedConversation?.getMessages();
      if (paginator) {
        setMessages(paginator.items);
      }
    };
    getMsg();
    const subscribe = async () => {
      selectedConversation?.on('messageAdded', (message) => {
        if (message != undefined) setMessages([...(messages || []), message]);
      });
    };
  }, [selectedConversation, messages]);

  return (
    <div ref={divRef} className="grow overflow-y-auto rounded-2xl">
      {messages?.map((message) => {
        const msg: { body: string | null; author: string | null; date: Date | null } = {
          body: message?.body,
          author: message?.author,
          date: message?.dateUpdated
        };
        return <ChatMessageContainer key={message.sid} {...msg} />;
      })}
    </div>
  );
}
