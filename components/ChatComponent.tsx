import { Participant } from '@twilio/conversations';
import { useConversations } from 'hooks';
import { useEffect, useState } from 'react';
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

export function ChatComponent() {
  const [members, setMembers] = useState<(string | null)[]>([]);
  const { selectedConversation } = useConversations();

  useEffect(() => {
    if (selectedConversation) {
      const getMembers = async () => {
        const participants = await selectedConversation.getParticipants();
        const identities = participants.map((participant) => participant.identity);
        console.log(identities);
        return identities;
      };

      getMembers().then((members) => setMembers(members));
    }
  }, [selectedConversation]);

  if (!selectedConversation) return null;

  const { friendlyName, state, attributes } = selectedConversation;
  const { avatar } = typeof attributes === 'string' ? JSON.parse(attributes) : attributes;

  return (
    <>
      <ChatHeader title={friendlyName} status={state?.current} avatar={avatar} members={members} />
      {<ChatContainer conversation={selectedConversation} />}
      <div className="grow-0 inset-x-0 bottom-0 justify-center">
        <ChatInput />
      </div>
    </>
  );
}
