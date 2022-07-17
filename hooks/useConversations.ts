import {
  Client as TwilioClient,
  Conversation,
  CreateConversationOptions
} from '@twilio/conversations';
import { useAuthCtx } from 'contexts';
import { useEffect, useRef, useState } from 'react';
import getChatToken from 'services/getChatToken';

function useConversations() {
  // Para evitar que se agreguen los listeners del cliente dos veces debido al StrictMode
  const isFirstRun = useRef(true);

  const { jwt, user } = useAuthCtx();

  const [conversationsClient, setConversationsClient] = useState<TwilioClient>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>();

  const [status, setStatus] = useState({
    status: 'default',
    statusString: 'Connecting to Twilio…'
  });

  // Inicializar el cliente de twilio
  useEffect(() => {
    if (!isFirstRun.current) return;
    if (!jwt || !user?.username || conversationsClient) return;

    async function initClient(jwt: string) {
      const accessToken = (await (await getChatToken(jwt)).json()).chatToken;
      const client = new TwilioClient(accessToken);

      console.log('ejecutando');

      client.on('connectionStateChanged', (state) => {
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
      });

      client.on('conversationJoined', (conversation) => {
        setConversations((prev) => [conversation, ...prev]);
      });

      client.on('conversationLeft', (conversationLeft) => {
        setConversations((prev) =>
          prev.filter((conversation) => conversation !== conversationLeft)
        );
      });

      setConversationsClient(client);
    }
    initClient(jwt);
    isFirstRun.current = false;
  }, [jwt, conversationsClient, user?.username]);

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
          console.log(error); // TODO
        }
      });

      return conversation;
    } catch (error) {
      console.log(error); // TODO
    }
  }

  function selectConversation(conversation: Conversation) {
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

export default useConversations;
