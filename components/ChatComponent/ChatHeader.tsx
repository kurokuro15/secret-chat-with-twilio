import { useSidebar } from 'hooks';
import { useState } from 'react';
import placeHolder from '../../public/avatar.png';
import BackIcon from '../icons/BackIcon';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import StatusComponent, { iHandlerStatus } from './StatusComponent';

export default function ChatHeader({
  title,
  status,
  participantIdentities,
  avatar,
  ...props
}: ChatHeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <div id="chat-header" className=" bg-purple-50 rounded-xl px-2 py-1 shadow-sm" {...props}>
      <div className="flex items-center justify-between md:mx-3 gap-1">
        <div className="chat-header-back aspect-square rounded-full hover:bg-purple-100 transition-colors touch-auto md:hidden">
          <Button variant="transparent-primary" className="rounded-full" onClick={toggleSidebar}>
            <BackIcon />
          </Button>
        </div>
        <div id="chat-header-title" className="p-0 m-0 grow">
          <h1 id="chat" className=" p-0 first-letter:capitalize m-0 text-2xl font-bold">
            {title}
          </h1>
          <StatusComponent status={status} participantIdentities={participantIdentities} />
        </div>
        <div className="xl:w-16 chat-image p-0 m-0 rounded-full border aspect-square overflow-hidden flex drop-shadow-md shrink-0">
          <Avatar src={avatar || placeHolder} className="xl:w-16 xl:h-16" />
        </div>
      </div>
    </div>
  );
}

interface ChatHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  status: keyof iHandlerStatus;
  participantIdentities: Array<string>;
  avatar: string;
}
