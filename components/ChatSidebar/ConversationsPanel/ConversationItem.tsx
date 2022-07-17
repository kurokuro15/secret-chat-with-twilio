import Button from 'components/Button';
import VerticalDotsIcon from 'components/icons/VerticalDotsIcon';
import { StaticImageData } from 'next/image';
import imgPlaceholder from 'public/avatar.png';
import { twMerge } from 'tailwind-merge';
import Avatar from '../../Avatar';

interface ConversationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string | null;
  imgSrc?: string | StaticImageData;
  selected: boolean;
}

function ConversationItem({ name, imgSrc, selected, ...props }: ConversationItemProps) {
  return (
    <div
      className={twMerge(
        'flex gap-5 items-center py-3 px-2 bg-white hover:bg-purple-100 font-bold cursor-pointer transition-all',
        selected && 'bg-purple-200 hover:bg-purple-200'
      )}
      {...props}
    >
      <Avatar src={imgSrc ?? imgPlaceholder} />
      <div className="grow">{name}</div>

      <Button variant="transparent-primary">
        <VerticalDotsIcon />
      </Button>
    </div>
  );
}

export default ConversationItem;
