import { useConversations, useSidebar } from 'hooks';
import placeHolder from '../../public/avatar.png';
import MenuIcon from '../icons/MenuIcon';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import StatusComponent, { iHandlerStatus } from './StatusComponent';
import { MouseEvent } from 'react';
import { BackIcon } from 'components/icons';

export default function ChatHeader({
  title,
  status,
  participantIdentities,
  avatar,
  onClick,
  ...props
}: ChatHeaderProps) {
  const { toggleSidebar, isMobile } = useSidebar();
  const { selectConversation } = useConversations();

  return (
    <div
      className="bg-purple-50 border border-purple-200 flex min-w-0 items-center rounded-md shadow-sm z-10"
      {...props}
    >
      {isMobile && (
        <Button
          variant="transparent-primary"
          className="h-full px-5 rounded-none focus:ring-0"
          onClick={() => {
            selectConversation();
          }}
        >
          <BackIcon className="w-8 h-8" />
        </Button>
      )}
      <Button
        variant="transparent-primary"
        className="flex gap-3 grow min-w-0 items-center justify-between rounded-none py-2 px-4 text-black"
        onClick={onClick}
      >
        <div className="min-w-0">
          <h2 className="truncate text-left">{title}</h2>
          <StatusComponent status={status} participantIdentities={participantIdentities} />
        </div>
        <Avatar src={avatar || placeHolder} className="w-16 h-16 shrink-0 shadow-md" />
      </Button>
    </div>
  );
}

interface ChatHeaderProps {
  title: string;
  status: keyof iHandlerStatus;
  participantIdentities: Array<string>;
  avatar: string;
  onClick: (evt: MouseEvent<HTMLButtonElement>) => void;
}
