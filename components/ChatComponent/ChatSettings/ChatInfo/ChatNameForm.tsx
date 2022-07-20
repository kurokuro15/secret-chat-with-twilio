import { yupResolver } from '@hookform/resolvers/yup';
import { Conversation } from '@twilio/conversations';
import Input from 'components/forms/Input';
import InputFeedback from 'components/forms/InputFeedback';
import SaveIcon from 'components/icons/SaveIcon';
import Button from 'components/ui/Button';
import { useNotifications } from 'hooks';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

export default function ChatNameForm({ conversation }: { conversation: Conversation }) {
  const { addNotification } = useNotifications();

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields }
  } = useForm<{ friendlyName: string }>({
    defaultValues: { friendlyName: conversation.friendlyName ?? '' },
    resolver: yupResolver(object({ friendlyName: string().required().max(100) }))
  });

  async function onSubmit({ friendlyName }: { friendlyName: string }) {
    if (friendlyName === conversation.friendlyName) return;

    try {
      await conversation.updateFriendlyName(friendlyName);
      addNotification({
        message: 'Se ha cambiado el nombre de la conversación',
        variant: 'success'
      });
    } catch (error) {
      addNotification({
        message: 'Ha ocurrido un error al cambiar el nombre de la conversación',
        variant: 'danger'
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <div className="mb-2">Nombre de la conversación</div>
        <div className="flex">
          <Input
            {...register('friendlyName')}
            className="border-gray-200 rounded-r-none"
            isInvalid={!!(errors.friendlyName && touchedFields.friendlyName)}
          />
          <Button
            className="rounded-l-none px-2"
            type="submit"
            title="Actualizar nombre de la conversación"
            aria-label="Actualizar nombre de la conversación"
          >
            <SaveIcon />
          </Button>
        </div>
        <InputFeedback>{errors.friendlyName?.message}</InputFeedback>
      </label>
    </form>
  );
}
