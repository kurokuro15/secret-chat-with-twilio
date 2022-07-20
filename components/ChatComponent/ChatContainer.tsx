import { Conversation, Message, Participant } from '@twilio/conversations';
import { useEffect, useRef, useState } from 'react';
import ChatMessageContainer from './ChatMessangeContainer';
import { useAuth } from 'hooks';
import getAvatarByUsername from 'services/getAvatarByUsername';

export default function ChatContainer({ conversation }: { conversation: Conversation }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [avatars, setAvatars] = useState<Record<string, string>>({});
  const { user } = useAuth();

  useEffect(() => {
    const author = messages[messages.length - 1]?.author;
    if (author === user?.username) divRef.current?.scrollTo({ top: divRef.current.scrollHeight });
  }, [messages, user]);

  useEffect(() => {
    const getAvatarUrl = async (identity: string | null) => {
      const url = identity ? await getAvatarByUsername(identity) : null;
      console.log('getAvatar', url);
      return [identity, url];
    };
    // retorna un array de la identidad y la url de la imagen

    const getAllAvatarUrl = async (conversation: Conversation): Promise<Record<string, string>> => {
      // esperamos a los participantes.
      const participants = await conversation.getParticipants();

      // Recorremos el array de participantes y devolvemos la url y el identity de cada uno
      const avatarsUrls = await Promise.all(
        participants.map(async (participant) => {
          const avatarUrl = await getAvatarUrl(participant.identity);
          return avatarUrl;
        })
      );
      // retornamos un array de objetos con la identidad y la url
      return Object.fromEntries(avatarsUrls);
    };

    const getMsg = async () => {
      const paginator = await conversation.getMessages();
      setMessages(paginator.items);
    };

    getAllAvatarUrl(conversation).then((avatarsUrls) => {
      console.log(avatarsUrls);
      console.log(typeof avatarsUrls);
      setAvatars(avatarsUrls);

      getMsg();

      conversation.on('messageAdded', (message) => {
        setMessages((messages) => [...messages, message]);
      });
    });

    return () => {
      conversation.removeAllListeners();
    };
  }, [conversation]);

  return (
    <div ref={divRef} className="grow overflow-y-auto rounded-2xl">
      {messages.map((message) => {
        const avatarUrl: string | null = message.author ? avatars[message.author] ?? null : null;
        const msg: iMessenge = {
          body: message.body,
          author: message.author,
          avatar: avatarUrl,
          date: message.dateUpdated ? message.dateUpdated : new Date()
        };
        return <ChatMessageContainer key={message.sid} {...msg} />;
      })}
    </div>
  );
}

export interface iMessenge {
  body: string | null;
  author: string | null;
  date: Date;
  avatar: string | null;
}
