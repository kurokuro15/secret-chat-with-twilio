import {
  Client as TwilioClient,
  Conversation,
  CreateConversationOptions
} from '@twilio/conversations';
import { useAuthCtx } from 'contexts/AuthCtx';
import { useEffect, useRef, useState } from 'react';
import getChatToken from 'services/getChatToken';

function useConversations() {
  const isFirstRun = useRef(true);
  const [conversationsClient, setConversationsClient] = useState<TwilioClient>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { jwt } = useAuthCtx();
  const [status, setStatus] = useState({
    status: 'default',
    statusString: 'Connecting to Twilio…'
  });

  // Inicializar el cliente de twilio
  useEffect(() => {
    if (!isFirstRun.current) return;

    async function initClient() {
      if (!jwt || conversationsClient) return;

      const accessToken = (await (await getChatToken(jwt)).json()).chatToken;
      const client = new TwilioClient(accessToken);

      client.on('connectionStateChanged', (state) => {
        if (state === 'connecting')
          setStatus({
            statusString: 'Conectando…',
            status: 'default'
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
            status: 'default'
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
    initClient();
    isFirstRun.current = false;
  }, [jwt, conversationsClient]);

  async function createConversation(options: CreateConversationOptions, participants: string[]) {
    try {
      const conversation = await conversationsClient?.createConversation(options);
      if (!conversation) return;

      await conversation.join();

      participants.forEach(async (participant) => {
        try {
          await conversation.add(participant); // No funciona con usuarios que no existan... :(
        } catch (error) {
          console.log(error); // TODO
        }
      });

      return conversation;
    } catch (error) {
      console.log(error); // TODO
    }
  }

  return { conversations, conversationsClient, status, createConversation };
}

export default useConversations;
