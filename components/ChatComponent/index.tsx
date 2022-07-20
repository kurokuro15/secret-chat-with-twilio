import { Participant } from '@twilio/conversations';
import { useConversations } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

export function ChatComponent() {
  const [participants, setParticipants] = useState<Array<Participant>>([]);
  const [identities, setIdentities] = useState<Array<string>>([]);
  const { selectedConversation, selectConversation } = useConversations();

  const handleKeyUp = useCallback(
    (evt: KeyboardEvent) => {
      const keyCode = evt.code;
      const scapeKeyCode = 'Escape';

      if (keyCode === scapeKeyCode) {
        selectConversation();
      }
    },
    [selectConversation]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  useEffect(() => {
    if (selectedConversation) {
      const getParticipants = async () => {
        return await selectedConversation.getParticipants();
      };
      getParticipants().then((participants) => setParticipants(participants));
    }
    return () => {
      setParticipants([]);
    };
  }, [selectedConversation]);

  useEffect(() => {
    participants.forEach((participant) =>
      setIdentities((identities) => [...identities, participant.identity ?? 'anon'])
    );
    return () => {
      setIdentities([]);
    };
  }, [participants]);

  if (!selectedConversation) return null;

  const { friendlyName, state, attributes } = selectedConversation;

  const title = friendlyName ? friendlyName : 'sala de chat';

  const status = state?.current ? state.current : 'closed';

  const { avatar }: { avatar: string } =
    typeof attributes === 'string' ? JSON.parse(attributes) : attributes;

  return (
    <main id="chat-component" className="grow overscroll-contain flex flex-col h-full p-2">
      <ChatHeader
        title={title}
        status={status}
        avatar={avatar}
        participantIdentities={identities}
      />
      <ChatContainer conversation={selectedConversation} />
      <ChatInput />
    </main>
  );
}
