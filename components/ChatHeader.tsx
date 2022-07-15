import perfilTemp from '../public/photo.jpg';
import Avatar from './Avatar';
import BackIcon from './icons/BackIcon';
import Link from 'next/link';

export default function ChatHeader(props: any) {
  // interfarce de Chat
  const { title, status, members, avatar } = props;
  return (
    <div
      id="chat-header"
      className="m-0 flex items-center justify-between bg-purple-50 rounded-xl px-2 py-1"
    >
      <div className="chat-header-back aspect-square rounded-full hover:bg-purple-100 transition-colors touch-auto">
        <Link href="/">
          <BackIcon />
        </Link>
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
