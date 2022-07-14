import Avatar from './Avatar';
import imgPlaceholder from 'public/photo.jpg';
import PlusIcon from './icons/PlusIcon';
import { Panel } from './ChatSidebar';
import CloseIcon from './icons/CloseIcon';

function ConversationsHeader({
  selectPanel,
  selectedPanel
}: {
  selectPanel: (panel: Panel) => void;
  selectedPanel: Panel;
}) {
  const Button =
    selectedPanel === 'createConversation' ? (
      <button
        className="transition-all rounded-full p-1 text-red-500 hover:bg-red-100"
        onClick={() => selectPanel('conversations')}
      >
        <CloseIcon className="w-8 h-8 " />
      </button>
    ) : (
      <button
        className="transition-all rounded-full p-1 hover:bg-purple-100"
        onClick={() => selectPanel('createConversation')}
      >
        <PlusIcon className="w-8 h-8" />
      </button>
    );

  return (
    <div className="flex gap-5 items-center justify-between py-3 px-2 bg-white border-b border-b-purple-500">
      <Avatar src={imgPlaceholder} className="w-9 h-9" />
      <div>
        <p className="font-bold">Conversaciones</p>
      </div>
      {Button}
    </div>
  );
}

export default ConversationsHeader;
