import { useAuth } from 'hooks';

export default function ChatMessageContainer({
  body,
  author,
  date
}: {
  body: string | null;
  author: string | null;
  date: Date | null;
}) {
  let flex = 'flex-row';
  let color = 'border-gray-100  bg-gray-100';
  const { user } = useAuth();

  if (author === user?.username) {
    flex = 'flex-row-reverse';
    color = 'border-purple-100  bg-purple-100';
  }

  return (
    <div className="m-1.5 p-1">
      <div className={`flex ${flex} gap-6 justify-between`}>
        <div
          className={`border  rounded-xl ${color} min-w-min lg:max-w-md drop-shadow-sm p-1 max-w-[18rem] shadow-transparent`}
        >
          <div className="m-1 pl-2">
            <div className={`font-normal font-sans from-neutral-600 text-[14px]`}>
              <p id="message-content">
                {body}
                <span className="relative top-1.5 bottom-auto float-right ml-1.5 px-1 ">
                  <span
                    className="message-time text-[.75rem] whitespace-nowrap italic text-gray-600"
                    title={'today'}
                  >
                    {date?.getHours()}:{date?.getMinutes()}
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
