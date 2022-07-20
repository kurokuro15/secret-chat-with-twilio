import { Conversation } from '@twilio/conversations';
import AvatarInput from 'components/AvatarUpload';
import Input from 'components/forms/Input';
import Modal from 'components/ui/Modal';
import { uploadFile } from 'services/files';
import getAvatarUrl from 'services/getAvatarUrl';

export default function ChatSettings({
  show,
  conversation,
  attributes,
  onClose
}: {
  show: boolean;
  conversation: Conversation;
  attributes: any;
  onClose: () => void;
}) {
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
      </Modal.Body>
    </Modal>
  );
}
