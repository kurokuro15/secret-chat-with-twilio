import { Conversation, Message, Paginator } from '@twilio/conversations';
import { useAuth } from 'hooks';
import throttle from 'just-throttle';
import { useEffect, useRef, useState, useTransition } from 'react';
import getAvatarByUsername from 'services/getAvatarByUsername';
import ChatMessageContainer from './ChatMessangeContainer';

export default function ChatContainer({ conversation }: { conversation: Conversation }) {
  const divRef = useRef<HTMLDivElement>(null);
  const visorRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [avatars, setAvatars] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const [gotMessages, startSettingMessages] = useTransition();
  const paginator = useRef<Paginator<Message>>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      throttle(() => {
        const currentPaginator = paginator.current;
        if (!currentPaginator) {
          conversation.getMessages(30).then((newPaginator) => {
            paginator.current = newPaginator;
            startSettingMessages(() => setMessages((prev) => [...newPaginator.items, ...prev]));
          });
        } else {
          if (currentPaginator.hasPrevPage) {
            currentPaginator.prevPage().then((newPaginator) => {
              paginator.current = newPaginator;
              setMessages((prev) => [...newPaginator.items, ...prev]);
            });
          }
        }
      }, 2000),
      {
        root: divRef.current,
        threshold: 1,
        rootMargin: '35%'
      }
    );

    visorRef.current && observer.observe(visorRef.current);

    return () => {
      observer.disconnect();
      paginator.current = undefined;
      setMessages([]);
    };
  }, [conversation]);

  useEffect(() => {
    if (!gotMessages) {
      divRef.current?.scrollTo({ top: divRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [gotMessages]);

  useEffect(() => {
    const getAvatarUrl = async (identity: string | null) => {
      const url = identity ? await getAvatarByUsername(identity) : null;
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

    getAllAvatarUrl(conversation).then((avatarsUrls) => {
      setAvatars(avatarsUrls);
    });

    function addMessage(message: Message) {
      let atBottom;
      const container = divRef.current;
      if (container?.scrollHeight && container?.scrollTop) {
        atBottom = container?.scrollHeight - container?.scrollTop === container?.clientHeight;
      }
      if (message.author === user?.username || atBottom) {
        startSettingMessages(() => setMessages((messages) => [...messages, message]));
      } else {
        setMessages((messages) => [...messages, message]);
      }
    }
    conversation.on('messageAdded', addMessage);

    return () => {
      conversation.removeListener('messageAdded', addMessage);
    };
  }, [conversation, user]);

  return (
    <div ref={divRef} className="grow overflow-y-auto snap-y scroll-smooth" tabIndex={0}>
      <div ref={visorRef} />
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
