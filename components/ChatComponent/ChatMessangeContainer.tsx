import Avatar from 'components/ui/Avatar';
import { useAuth } from 'hooks';
import { useEffect, useState } from 'react';
import { iMessenge } from './ChatContainer';
import placeHolder from '../../public/avatar.png';
import getAvatarByUsername from 'services/getAvatarByUsername';
import { StaticImageData } from 'next/image';

export default function ChatMessageContainer({ body, author, date, avatar }: iMessenge) {
  const [avatarUrl, setAvatarUrl] = useState<string | StaticImageData>('');

  const { user } = useAuth();
  let flex = 'flex-row';
  let color = 'border-gray-100  bg-gray-100';
  if (author === user?.username) {
    flex = 'flex-row-reverse';
    color = 'border-purple-100  bg-purple-100';
  }
  const timeFormatter = new Intl.DateTimeFormat('es', { hour: '2-digit', minute: '2-digit' });
  return (
    <div className="m-1.5 p-1">
      <div className={`flex ${flex} gap-6 justify-between`}>
        <div
          className={`border rounded-xl ${color} min-w-min lg:max-w-md drop-shadow-sm p-1 max-w-[18rem] shadow-transparent`}
        >
          <div className="gap-2 flex flex-row text-gray-600 items-center ">
            <Avatar src={avatar || placeHolder} className="shrink-0 w-5 h-5" />
            <h6 className="grow-auto font-bold">{author}</h6>
          </div>
          <div className="m-1 pl-2">
            <div className={`font-normal font-sans from-neutral-600 text-[14px]`}>
              <p id="message-content">
                {body}
                <span className="relative top-1.5 bottom-auto float-right ml-1.5 px-1 ">
                  <span
                    className="message-time shrink-0 text-[.75rem] whitespace-nowrap italic text-gray-600"
                    title={'today'}
                  >
                    {timeFormatter.format(date)}
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
