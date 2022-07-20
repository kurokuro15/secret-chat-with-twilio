import { Participant } from '@twilio/conversations';
import { useAuth, useConversations } from 'hooks';
import { useCallback, useEffect, useState } from 'react';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatSettings from './ChatSettings';

export function ChatComponent() {
  const [participants, setParticipants] = useState<Array<Participant>>([]);
  const [identities, setIdentities] = useState<Array<string>>([]);
  const { selectedConversation, selectConversation } = useConversations();
  const [showSettings, setShowSettings] = useState(false);
  const { user } = useAuth();

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
    if (!selectedConversation) return;
    setShowSettings(false);

    const getParticipants = async () => {
      return await selectedConversation.getParticipants();
    };
    getParticipants().then((participants) => setParticipants(participants));

    function addParticipant(participant: Participant) {
      setParticipants((prev) => [participant, ...prev]);
    }

    function removeParticipant(participant: Participant) {
      setParticipants((prev) => prev.filter((par) => par !== participant));
      if (participant.identity === user?.username) selectConversation();
    }

    selectedConversation
      .on('participantJoined', addParticipant)
      .on('participantLeft', removeParticipant);

    return () => {
      setParticipants([]);
      selectedConversation.removeListener('participantJoined', addParticipant);
      selectedConversation.removeListener('participantLeft', removeParticipant);
    };
  }, [selectedConversation, selectConversation, user?.username]);

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

  const convAttributes = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;

  return (
    <main id="chat-component" className="grow overscroll-contain flex flex-col h-full p-2">
      <ChatHeader
        title={title}
        status={status}
        avatar={convAttributes.avatar_url}
        participantIdentities={identities}
        onClick={() => setShowSettings(true)}
      />
      <ChatContainer conversation={selectedConversation} />
      <ChatInput />
      <ChatSettings
        show={showSettings}
        conversation={selectedConversation}
        participants={participants}
        attributes={convAttributes}
        onClose={() => setShowSettings(false)}
      />
    </main>
  );
}
