import imgPlaceholder from 'public/photo.jpg';
import { StaticImageData } from 'next/image';
import Avatar from './Avatar';

interface ConversationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string | null;
  imgSrc?: string | StaticImageData;
}

function ConversationItem({ name, imgSrc }: ConversationItemProps) {
  return (
    <div className="flex gap-5 items-center py-3 px-2 bg-white hover:bg-purple-100 font-bold cursor-pointer transition-all">
      <Avatar src={imgSrc ?? imgPlaceholder} />
      <div className="grow">{name}</div>
    </div>
  );
}

export default ConversationItem;
