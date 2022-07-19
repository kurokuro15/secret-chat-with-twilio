import perfilTemp from '../public/avatar.png';
import Avatar from './ui/Avatar';
import BackIcon from './icons/BackIcon';
import Button from './ui/Button';
import { useSidebar } from 'hooks';
import StatusComponent from './StatusComponent';

export default function ChatHeader({ title, status, members, avatar }: ChatHeaderProps) {
  const { toggleSidebar } = useSidebar();
  // manejando el state de la conversación de Twilio

  return (
    <div id="chat-header" className=" bg-purple-50 rounded-xl px-2 py-1 shadow-sm">
      <div className="flex items-center justify-between mx-3 gap-1">
        <div className="chat-header-back aspect-square rounded-full hover:bg-purple-100 transition-colors touch-auto md:hidden">
          <Button variant="transparent-primary" className="rounded-full" onClick={toggleSidebar}>
            <BackIcon />
          </Button>
        </div>
        <div id="chat-header-title" className="p-0 m-0 grow-0">
          <h1 id="chat" className=" p-0 first-letter:capitalize m-0 text-2xl font-bold">
            {title}
          </h1>
          <StatusComponent status={status} participants={members} />
        </div>
        <div className="xl:w-16 chat-image p-0 m-0 rounded-full border aspect-square overflow-hidden flex drop-shadow-md shrink-0">
          <Avatar src={avatar || perfilTemp} className="xl:w-16 xl:h-16" />
        </div>
      </div>
    </div>
  );
}

interface ChatHeaderProps {
  title: string | null; // Quitar la opcionalidad al implementar de verdad
  status: string | null | undefined; // Quitar la opcionalidad al implementar de verdad
  members?: (string | null)[];
  avatar: string | null; // Quitar la opcionalidad al implementar de verdad
}
