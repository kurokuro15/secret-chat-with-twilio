import { Client as TwilioClient, Conversation } from '@twilio/conversations';
import { useAuthCtx } from 'contexts/AuthCtx';
import { useEffect, useState } from 'react';
import getChatToken from 'services/getChatToken';

function useConversations() {
  const [chatClient, setChatClient] = useState<TwilioClient>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { jwt } = useAuthCtx();
  const [status, setStatus] = useState({
    status: 'default',
    statusString: 'Connecting to Twilio…'
  });

  // Inicializar el cliente de twilio
  useEffect(() => {
    if (!jwt) return;

    if (chatClient === undefined) {
      getChatToken(jwt)
        .then((res) => res.json())
        .then((data) => {
          setChatClient(new TwilioClient(data.chatToken));
        });
    }
  }, [jwt, chatClient]);

  // Agregar los listeners 'necesarios'
  useEffect(() => {
    chatClient?.on('connectionStateChanged', (state) => {
      if (state === 'connecting')
        setStatus({
          statusString: 'Connecting to Twilio…',
          status: 'default'
        });
      if (state === 'connected') {
        setStatus({
          statusString: 'You are connected.',
          status: 'success'
        });
        getConversations(chatClient).then(setConversations);
      }
      if (state === 'disconnecting')
        setStatus({
          statusString: 'Disconnecting from Twilio…',
          status: 'default'
        });
      if (state === 'disconnected')
        setStatus({
          statusString: 'Disconnected.',
          status: 'warning'
        });
      if (state === 'denied')
        setStatus({
          statusString: 'Failed to connect.',
          status: 'error'
        });
    });
  }, [chatClient]);

  async function createConversation({ friendlyName }: { friendlyName: string }) {
    try {
      const conversation = await chatClient?.createConversation({ friendlyName });
      return conversation;
    } catch (error) {
      console.log('ups', error);
    }
  }

  async function deleteConversation(conversation: Conversation) {
    try {
      return await conversation.delete();
    } catch (error) {
      console.log('ups', error);
    }
  }

  return { conversations, chatClient, status, createConversation, deleteConversation };
}

async function getConversations(client: TwilioClient) {
  const paginator = await client.getSubscribedConversations();
  return paginator.items;
}

export default useConversations;
