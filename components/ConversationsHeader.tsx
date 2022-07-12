import Avatar from './Avatar';
import imgPlaceholder from 'public/photo.jpg';
import PlusIcon from './icons/PlusIcon';

function ConversationsHeader() {
  return (
    <div className="flex gap-5 items-center justify-between py-3 px-2 bg-white border-b border-b-purple-500">
      <Avatar src={imgPlaceholder} className="w-9 h-9" />
      <div>
        <p className="font-bold">Conversaciones</p>
      </div>
      <button className="transition-all rounded-full p-1 hover:bg-purple-100">
        <PlusIcon className="w-8 h-8" />
      </button>
    </div>
  );
}

export default ConversationsHeader;
