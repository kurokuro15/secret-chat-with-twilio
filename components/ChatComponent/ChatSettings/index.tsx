import { Conversation, Participant } from '@twilio/conversations';
import Modal from 'components/ui/Modal';
import { useAuth } from 'hooks';
import { ChatInfo } from './ChatInfo';
import { Participants } from './Participants';

export default function ChatSettings({
  show,
  conversation,
  attributes,
  onClose,
  participants
}: {
  show: boolean;
  conversation: Conversation;
  attributes: any;
  onClose: () => void;
  participants: Participant[];
}) {
  const { user } = useAuth();
  const isAdmin = conversation.createdBy === user?.username;
  return (
    <Modal show={show} className="p-5">
      <Modal.Header onClose={onClose}>
        <h3>Ajustes de la conversación</h3>
      </Modal.Header>

      <Modal.Body>
        <ChatInfo conversation={conversation} attributes={attributes} isAdmin={isAdmin} />

        <hr className="my-4" />

        <Participants participants={participants} conversation={conversation} isAdmin={isAdmin} />
      </Modal.Body>
    </Modal>
  );
}
