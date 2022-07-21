import { useConversations } from 'hooks';
import { useForm } from 'react-hook-form';
import EmojiPicker from '../EmojiPicker';
import Input from '../forms/Input';
import { SendIcon, SmileIcon } from '../icons';
import Button from '../ui/Button';
import Overlay from '../ui/Overlay';

export default function ChatInput() {
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    reset,
    setFocus,
    formState: { isSubmitting }
  } = useForm<InputData>({
    defaultValues: { message: '' }
  });

  const { selectedConversation } = useConversations();

  const onSubmit = async (values: InputData) => {
    const { message } = values;
    reset();
    await selectedConversation?.sendMessage(message);
  };

  return (
    <div className="grow-0 inset-x-0 bottom-0 justify-center z-10 pt-1">
      <form className="flex gap-x-3 h-9" onSubmit={handleSubmit(onSubmit)}>
        <Overlay
          content={
            <EmojiPicker
              onPick={(emoji) => {
                setValue('message', getValues('message') + emoji);
                setFocus('message');
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
            {...register('message', { required: true })}
            className="border rounded-full border-purple-300"
            type="text"
            placeholder="Escribe un mensaje..."
            autoComplete="off"
          />
        </div>

        <Button
          variant="outline-primary"
          className="rounded-full p-1 aspect-square border-purple-300"
          type="submit"
          aria-label="send"
          disabled={isSubmitting}
        >
          <SendIcon className="w-full rotate-90" />
        </Button>
      </form>
    </div>
  );
}

interface InputData {
  message: string;
}
