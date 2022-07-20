import { useSidebar } from 'hooks';
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
    <div
      className=" bg-purple-50 flex justify-between gap-5 min-w-0 items-center rounded-md px-2 py-1 shadow-sm cursor-pointer"
      {...props}
    >
      <div className="flex gap-3 min-w-0 items-center">
        <div>
          <Button
            variant="transparent-primary"
            className="rounded-full"
            onClick={(evt) => {
              evt.stopPropagation();
              toggleSidebar();
            }}
          >
            <BackIcon />
          </Button>
        </div>
        <div className="min-w-0">
          <h2 className="truncate">{title}</h2>
          <StatusComponent status={status} participantIdentities={participantIdentities} />
        </div>
      </div>
      <Avatar src={avatar || placeHolder} className="w-16 h-16 shrink-0" />
    </div>
  );
}

interface ChatHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  status: keyof iHandlerStatus;
  participantIdentities: Array<string>;
  avatar: string;
}
