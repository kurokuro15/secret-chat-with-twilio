import {
  Client as TwilioClient,
  Conversation,
  CreateConversationOptions
} from '@twilio/conversations';
import { useAuth, useNotifications } from 'hooks';
import { createContext, ReactNode, useEffect, useState } from 'react';
import getChatToken from 'services/getChatToken';

const ConversationsCtx = createContext<ConversationsContext | undefined>(undefined);

function ConversationsProvider({ children }: { children: ReactNode }) {
  const conversationsUtils = useConversationsCtx();
  return (
    <ConversationsCtx.Provider value={conversationsUtils}>{children}</ConversationsCtx.Provider>
  );
}

function useConversationsCtx() {
  const { addNotification } = useNotifications();
  const { jwt } = useAuth();

  const [conversationsClient, setConversationsClient] = useState<TwilioClient>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>();

  const [status, setStatus] = useState({
    status: 'default',
    statusString: 'Connecting to Twilio…'
  });

  // Inicializar el cliente de twilio
  useEffect(() => {
    if (!jwt) return;

    async function initClient(jwt: string) {
      try {
        const accessToken = await getChatToken(jwt);
        const client = new TwilioClient(accessToken);
        setConversationsClient(client);
      } catch (error) {
        console.log(error);
      }
    }
    initClient(jwt);
  }, [jwt]);

  // Agregar los listeners
  useEffect(() => {
    if (!conversationsClient || !jwt) return;
    conversationsClient
      .on('connectionStateChanged', (state) => {
        if (state === 'connecting')
          setStatus({
            statusString: 'Conectando…',
            status: 'loading'
          });
        if (state === 'connected') {
          setStatus({
            statusString: 'Estás en línea',
            status: 'success'
          });
        }
        if (state === 'disconnecting')
          setStatus({
            statusString: 'Desconectando…',
            status: 'loading'
          });
        if (state === 'disconnected')
          setStatus({
            statusString: 'Desconectado',
            status: 'warning'
          });
        if (state === 'denied')
          setStatus({
            statusString: 'No se pudo conectar.',
            status: 'error'
          });
      })
      .on('conversationJoined', (conversation) => {
        setConversations((prev) => [conversation, ...prev]);
      })
      .on('conversationLeft', (conversationLeft) => {
        setConversations((prev) =>
          prev.filter((conversation) => conversation !== conversationLeft)
        );
      })
      .on('tokenAboutToExpire', async () => {
        try {
          const newToken = await getChatToken(jwt);
          conversationsClient.updateToken(newToken);
        } catch (error) {
          if (error instanceof Error) {
            addNotification({ message: error.message });
          }
        }
      });

    return () => {
      conversationsClient.removeAllListeners();
      setConversations([]);
    };
  }, [jwt, conversationsClient, addNotification]);

  async function createConversation(
    options: CreateConversationOptions,
    participants: { username: string }[]
  ) {
    try {
      const conversation = await conversationsClient?.createConversation(options);
      if (!conversation) return;

      await conversation.join();

      participants.forEach(async (participant) => {
        try {
          await conversation.add(participant.username); // No funciona con usuarios que no existan... :(
        } catch (error) {
          if (error instanceof Error) {
            addNotification({ message: error.message });
          }
        }
      });

      return conversation;
    } catch (error) {
      if (error instanceof Error) {
        addNotification({ message: error.message });
      }
    }
  }

  function selectConversation(conversation?: Conversation) {
    setSelectedConversation(conversation);
  }

  return {
    conversations,
    conversationsClient,
    status,
    createConversation,
    selectedConversation,
    selectConversation
  };
}

export { ConversationsProvider, ConversationsCtx };

type ConversationsContext = ReturnType<typeof useConversationsCtx>;
