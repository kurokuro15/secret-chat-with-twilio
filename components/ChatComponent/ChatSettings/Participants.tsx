import { yupResolver } from '@hookform/resolvers/yup';
import { Conversation, Participant } from '@twilio/conversations';
import Input from 'components/forms/Input';
import InputFeedback from 'components/forms/InputFeedback';
import { CloseIcon, PlusIcon } from 'components/icons';
import Avatar from 'components/ui/Avatar';
import Button from 'components/ui/Button';
import { useNotifications } from 'hooks';
import { useForm } from 'react-hook-form';
import getAvatarByUsername from 'services/getAvatarByUsername';
import isUsernameAvailable from 'services/isUsernameAvailable';
import { object, string } from 'yup';
import ParticipantAvatar from './ParticipantAvatar';

const defaultValues = {
  participant: ''
};

const validationSchema = object({
  participant: string()
    .required()
    .test('is-user', 'Este usuario no existe', async (username) => {
      if (!username) return true;
      const isUser = !(await isUsernameAvailable(username));
      return isUser;
    })
});

export function Participants({
  participants,
  conversation,
  isAdmin
}: {
  participants: Participant[];
  conversation: Conversation;
  isAdmin: boolean;
}) {
  const { addNotification } = useNotifications();

  const {
    handleSubmit,
    register,
    formState: { touchedFields, errors, isSubmitting },
    reset
  } = useForm<{ participant: string }>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onSubmit'
  });

  async function onSubmit({ participant }: { participant: string }) {
    try {
      await conversation.add(participant);
      reset();
    } catch (error) {
      addNotification({ message: 'No se pudo agregar el participante', variant: 'danger' });
    }
  }

  return (
    <>
      <h4 className="font-bold">Participantes</h4>
      <ul>
        {participants.map((participant) => (
          <li key={participant.sid} className="py-3 flex justify-between items-center">
            <div className="flex items-center gap-5">
              <ParticipantAvatar username={participant.identity} />
              <div>{participant.identity}</div>
            </div>
            {isAdmin && (
              <div>
                <Button
                  variant="transparent-danger"
                  className="rounded-full"
                  onClick={async () => {
                    try {
                      await participant.remove();
                    } catch (error) {
                      if (error instanceof Error) {
                        addNotification({
                          message: error.message,
                          variant: 'danger'
                        });
                      }
                    }
                  }}
                >
                  <CloseIcon />
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <>
          <hr className="my-4" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <div className="mb-2 font-bold">Agregar participante</div>
              <Input
                {...register('participant')}
                isInvalid={!!(touchedFields.participant && errors.participant)}
              />
            </label>
            <InputFeedback>{errors.participant?.message}</InputFeedback>

            <Button className="w-full text-center mt-3" type="submit" disabled={isSubmitting}>
              <PlusIcon className="mx-auto" />
            </Button>
          </form>
        </>
      )}
    </>
  );
}
