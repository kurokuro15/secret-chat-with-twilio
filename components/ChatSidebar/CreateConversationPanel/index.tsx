import { yupResolver } from '@hookform/resolvers/yup';
import BackIcon from 'components/icons/BackIcon';
import { useConversationsCtx } from 'contexts/ConversationsCtx';
import { useSidebarCtx } from 'contexts/SidebarCtx';
import { useForm } from 'react-hook-form';
import { array, object, string } from 'yup';
import Button from '../../Button';
import Input from '../../forms/Input';
import InputFeedback from '../../forms/InputFeedback';
import CloseIcon from '../../icons/CloseIcon';
import PlusIcon from '../../icons/PlusIcon';
import PanelContent from '../PanelContent';
import PanelHeader from '../PanelHeader';

const defaultValues = {
  friendlyName: '',
  participants: ['']
};

const validationSchema = object({
  friendlyName: string().required(),
  participants: array(string().required())
});

export default function CreateConversationPanel() {
  const { createConversation } = useConversationsCtx();
  const { changePanel } = useSidebarCtx();

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
    changePanel('conversations');
  }

  return (
    <>
      <PanelHeader className="flex items-center gap-5">
        <Button
          variant="transparent-primary"
          className="rounded-full"
          onClick={() => changePanel('conversations')}
        >
          <BackIcon />
        </Button>

        <h2 className="font-bold">Crear conversación</h2>
      </PanelHeader>

      <PanelContent>
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
              className="rounded-full"
              variant="transparent-primary"
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
      </PanelContent>
    </>
  );
}

interface ConversationData {
  friendlyName: string;
  participants: string[];
}
