import Button from './ui/Button';
import Input from './forms/Input';
import { SendIcon, SmileIcon } from './icons';
import { useConversations } from 'hooks';
import { useState } from 'react';

export default function ChatInput() {
  let [input, setInput] = useState('');
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
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder="Type a message..."
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
