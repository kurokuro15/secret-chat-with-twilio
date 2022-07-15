import Avatar from '../Avatar';
import imgPlaceholder from 'public/photo.jpg';
import PlusIcon from '../icons/PlusIcon';
import { Panel } from '.';
import CloseIcon from '../icons/CloseIcon';
import Button from '../Button';

function ConversationsHeader({
  selectPanel,
  selectedPanel
}: {
  selectPanel: (panel: Panel) => void;
  selectedPanel: Panel;
}) {
  const actionButton =
    selectedPanel === 'createConversation' ? (
      <Button
        variant="transparent-danger"
        className="rounded-full"
        onClick={() => selectPanel('conversations')}
      >
        <CloseIcon className="w-8 h-8 " />
      </Button>
    ) : (
      <Button
        variant="transparent-primary"
        className="rounded-full"
        onClick={() => selectPanel('createConversation')}
      >
        <PlusIcon className="w-8 h-8" />
      </Button>
    );

  return (
    <div className="flex gap-5 items-center justify-between py-3 px-2 bg-white border-b border-b-purple-500">
      <Avatar src={imgPlaceholder} className="w-9 h-9" />
      <div>
        <p className="font-bold">Conversaciones</p>
      </div>
      {actionButton}
    </div>
  );
}

export default ConversationsHeader;
