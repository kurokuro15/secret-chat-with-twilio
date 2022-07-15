import Button from './Button';
import Input from './forms/Input';
import SendIcon from './icons/SendIcon';
import SmileIcon from './icons/SmileIcon';

export default function ChatInput() {
  return (
    <form className="flex gap-x-3 h-9">
      <Button
        variant="outline-primary"
        className="rounded-full p-1 aspect-square border-purple-300"
        type="button"
        aria-label="send"
      >
        <SmileIcon className="w-6 h-6 mx-auto" />
      </Button>
      <div className="grow">
        <Input
          className="border rounded-xl border-purple-300"
          type="text"
          placeholder="Type a message..."
        />
      </div>
      <Button
        variant="outline-primary"
        className="rounded-full p-1 aspect-square border-purple-300"
        type="button"
        aria-label="send"
      >
        <SendIcon className="w-full rotate-90" />
      </Button>
    </form>
  );
}
