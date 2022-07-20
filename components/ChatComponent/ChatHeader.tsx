import { useSidebar } from 'hooks';
import placeHolder from '../../public/avatar.png';
import BackIcon from '../icons/BackIcon';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import StatusComponent, { iHandlerStatus } from './StatusComponent';
import { MouseEvent } from 'react';

export default function ChatHeader({
  title,
  status,
  participantIdentities,
  avatar,
  onClick,
  ...props
}: ChatHeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <div
      className="bg-purple-50 border border-purple-200 flex min-w-0 items-center rounded-md shadow-sm z-10"
      {...props}
    >
      <Button
        variant="transparent-primary"
        className="h-full px-5 rounded-none focus:ring-0"
        onClick={() => {
          toggleSidebar();
        }}
      >
        <BackIcon />
      </Button>
      <Button
        variant="transparent-primary"
        className="flex gap-3 grow min-w-0 items-center justify-between rounded-none p-2 text-black"
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
