import SendIcon from './icons/SendIcon';
import SmileIcon from './icons/SmileIcon';

export default function ChatInput() {
  return (
    <div className="grow-0 inset-x-0 bottom-0 justify-center">
      <form className="flex container p-0 m-0 gap-x-3">
        <div className="p-0 m-0 h-9 rounded-full border border-purple-200 aspect-square overflow-hidden flex flex-none align-content justify-center transition-colors touch-auto hover:bg-purple-400">
          <button className="w-full" type="button" aria-label="send">
            <SmileIcon className="w-full h-6 text-purple-900" />
          </button>
        </div>
        <div className="p-0 m-0 overflow-hidden flex-1">
          <input
            className="w-full m-0 border rounded-xl border-purple-200 pl-2 pb-1.5 pt-1"
            type="text"
            placeholder="Type a message..."
          />
        </div>
        <div className="p-0 m-0 h-9 rounded-full border border-purple-200 aspect-square overflow-hidden flex flex-none align-content justify-center transition-colors touch-auto hover:bg-purple-400">
          <button className="w-full" type="button" aria-label="send">
            <SendIcon className="w-full h-6 text-purple-900 rotate-90" />
          </button>
        </div>
      </form>
    </div>
  );
}
