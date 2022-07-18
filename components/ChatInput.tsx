import { useConversations } from 'hooks';
import { useRef, useState } from 'react';
import EmojiPicker from './EmojiPicker';
import Input from './forms/Input';
import { SendIcon, SmileIcon } from './icons';
import Button from './ui/Button';
import Overlay from './ui/Overlay';

export default function ChatInput() {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedConversation } = useConversations();

  const sendMessage = async () => {
    if (input.length > 0) {
      await selectedConversation?.sendMessage(input);
      setInput('');
    }
  };

  return (
    <form
      className="flex gap-x-3 h-9"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <Overlay
        content={
          <EmojiPicker
            onPick={(emoji) => {
              setInput((prev) => prev + emoji);
              inputRef.current?.focus();
            }}
          />
        }
        position="top"
      >
        <Button
          variant="outline-primary"
          className="rounded-full p-1 aspect-square border-purple-300"
          type="button"
          aria-label="emoji"
        >
          <SmileIcon className="w-6 h-6 mx-auto" />
        </Button>
      </Overlay>

      <div className="grow">
        <Input
          className="border rounded-xl border-purple-300"
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Type a message..."
          ref={inputRef}
        />
      </div>

      <Button
        variant="outline-primary"
        className="rounded-full p-1 aspect-square border-purple-300"
        type="submit"
        aria-label="send"
      >
        <SendIcon className="w-full rotate-90" />
      </Button>
    </form>
  );
}
