import { Conversation, Participant } from '@twilio/conversations';
import AvatarInput from 'components/AvatarUpload';
import Input from 'components/forms/Input';
import { CloseIcon } from 'components/icons';
import Avatar from 'components/ui/Avatar';
import Button from 'components/ui/Button';
import Modal from 'components/ui/Modal';
import { useNotifications } from 'hooks';
import { uploadFile } from 'services/files';
import getAvatarUrl from 'services/getAvatarUrl';

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
  const { addNotification } = useNotifications();

  return (
    <Modal show={show}>
      <Modal.Header onClose={onClose}>
        <h3>Ajustes de la conversación</h3>
      </Modal.Header>

      <Modal.Body>
        <div className="flex gap-5 items-center">
          <AvatarInput
            onChange={async (path, file) => {
              await uploadFile('avatars', path, file);
              await conversation.updateAttributes({ avatar_url: getAvatarUrl(path) });
            }}
            imgSrc={attributes.avatar_url}
            className="shadow-md"
          />
          <div>
            <label>
              <div className="mb-2">Nombre de la conversación</div>
              <Input defaultValue={conversation.friendlyName || ''} className="border-gray-200" />
            </label>
          </div>
        </div>

        <hr className="my-4" />

        <h4 className="font-bold">Participantes</h4>
        <ul>
          {participants.map((participant) => (
            <li key={participant.sid} className="py-3 px-2 flex justify-between items-center">
              <div className="flex items-center gap-5">
                <Avatar />
                <div>{participant.identity}</div>
              </div>
              <div>
                <Button
                  variant="transparent-danger"
                  className="rounded-full"
                  onClick={async () => {
                    try {
                      await participant.remove();
                    } catch (error) {
                      if (error instanceof Error) {
                        addNotification({ message: error.message, variant: 'danger' });
                      }
                    }
                  }}
                >
                  <CloseIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
}
