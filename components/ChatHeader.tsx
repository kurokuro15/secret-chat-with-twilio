import perfilTemp from '../public/photo.jpg';
import Avatar from './Avatar';
import BackIcon from './icons/BackIcon';
import Button from './Button';
import { useSidebarCtx } from 'contexts/SidebarCtx';

export default function ChatHeader(props: ChatHeaderProps) {
  // interfarce de Chat
  const { title, status, members, avatar } = props;
  const { toggleSidebar } = useSidebarCtx();
  return (
    <div
      id="chat-header"
      className="m-0 flex items-center justify-between bg-purple-50 rounded-xl px-2 py-1"
    >
      <div className="chat-header-back aspect-square rounded-full hover:bg-purple-100 transition-colors touch-auto">
        <Button variant="transparent-primary" className="rounded-full" onClick={toggleSidebar}>
          <BackIcon />
        </Button>
      </div>
      <div id="chat-header-title" className="p-0 m-0">
        <h1 id="chat" className="p-0 m-0 text-2xl font-bold">
          {title ? title : 'Reynaldo González'}
        </h1>
        <small id="status" className="p-0 m-0 text-sm">
          {members ? members : status || 'Offline'}
        </small>
      </div>
      <div className="xl:w-16 chat-image p-0 m-0 rounded-full border aspect-square overflow-hidden flex drop-shadow-md">
        <Avatar src={avatar || perfilTemp} className="xl:w-16 xl:h-16" />
      </div>
    </div>
  );
}

interface ChatHeaderProps {
  title?: string; // Quitar la opcionalidad al implementar de verdad
  status?: string; // Quitar la opcionalidad al implementar de verdad
  members?: string[];
  avatar?: string; // Quitar la opcionalidad al implementar de verdad
}
