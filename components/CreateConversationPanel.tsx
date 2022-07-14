import { yupResolver } from '@hookform/resolvers/yup';
import { useConversationsCtx } from 'contexts/ConversationsCtx';
import { useForm } from 'react-hook-form';
import { array, object, string } from 'yup';
import Button from './Button';
import { Panel } from './ChatSidebar';
import Input from './forms/Input';
import InputFeedback from './forms/InputFeedback';
import CloseIcon from './icons/CloseIcon';
import PlusIcon from './icons/PlusIcon';

const defaultValues = {
  friendlyName: '',
  participants: ['']
};

const validationSchema = object({
  friendlyName: string().required(),
  participants: array(string().required())
});

export default function CreateConversationPanel({
  selectPanel
}: {
  selectPanel?: (panel: Panel) => void;
}) {
  const { createConversation } = useConversationsCtx();

  const {
    handleSubmit,
    register,
    formState: { touchedFields, errors },
    getValues,
    setValue,
    watch
  } = useForm<ConversationData>({ defaultValues, resolver: yupResolver(validationSchema) });

  function addParticipant() {
    setValue('participants', ['', ...getValues('participants')]);
  }

  function deleteParticipant(index: number) {
    const participants = getValues('participants').filter((p, i) => i !== index);
    setValue('participants', participants);
  }

  async function onSubmit({ friendlyName, participants }: ConversationData) {
    await createConversation({ friendlyName }, participants);
    selectPanel && selectPanel('conversations');
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <div className="mb-1">Nombre de la conversación</div>
          <Input
            {...register('friendlyName')}
            isInvalid={!!(touchedFields.friendlyName && errors.friendlyName)}
          />
          <InputFeedback>{errors.friendlyName?.message}</InputFeedback>
        </label>

        <hr className="my-3" />

        <div className="flex justify-between items-center">
          <label>Participantes</label>
          <Button
            className="transition-all block rounded-full mx-auto p-1 m-0"
            type="button"
            onClick={addParticipant}
          >
            <PlusIcon className="w-6 h-6" />
          </Button>
        </div>

        {watch('participants').map((participant, index, array) => (
          <div key={index} className="flex gap-1 justify-between items-center mt-2">
            <Input
              {...register(`participants.${index}`)}
              isInvalid={
                !!(
                  touchedFields.participants &&
                  errors.participants &&
                  touchedFields.participants[index] &&
                  errors.participants[index]
                )
              }
            />
            {index < array.length - 1 && (
              <div
                onClick={() => deleteParticipant(index)}
                className="text-red-500 cursor-pointer rounded-full hover:bg-red-100 p-1 transition-all"
              >
                <CloseIcon />
              </div>
            )}
          </div>
        ))}

        <Button type="submit" className="block w-full mt-3">
          Crear conversación
        </Button>
      </form>
    </>
  );
}

interface ConversationData {
  friendlyName: string;
  participants: string[];
}
