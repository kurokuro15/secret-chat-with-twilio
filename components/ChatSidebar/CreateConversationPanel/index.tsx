import { yupResolver } from '@hookform/resolvers/yup';
import { BackIcon, CloseIcon, PlusIcon } from 'components/icons';
import { useConversations, useSidebar } from 'hooks';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import isUsernameAvailable from 'services/isUsernameAvailable';
import { array, object, string } from 'yup';
import Input from '../../forms/Input';
import InputFeedback from '../../forms/InputFeedback';
import Button from '../../ui/Button';
import PanelContent from '../PanelContent';
import PanelHeader from '../PanelHeader';

const defaultValues = {
  friendlyName: '',
  participants: [{ username: '' }]
};

const validationSchema = object({
  friendlyName: string().required(),
  participants: array(
    object({
      username: string()
        .required()
        .test('is-user', 'Este usuario no existe', async (username) => {
          if (!username) return true;
          const isUser = !(await isUsernameAvailable(username));
          return isUser;
        })
    })
  )
});

export default function CreateConversationPanel() {
  const { createConversation, selectConversation } = useConversations();
  const { changePanel } = useSidebar();

  const {
    handleSubmit,
    register,
    formState: { touchedFields, errors, isSubmitting },
    control
  } = useForm<ConversationData>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: 'onSubmit'
  });

  const { fields, prepend, remove } = useFieldArray({ control, name: 'participants' });

  async function onSubmit({ friendlyName, participants }: ConversationData) {
    const conversation = await createConversation({ friendlyName }, participants);
    if (conversation) {
      changePanel('conversations');
      selectConversation(conversation);
    }
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
            <label htmlFor="participants">Participantes</label>
            <Button
              className="rounded-full"
              variant="transparent-primary"
              type="button"
              onClick={() => prepend({ username: '' })}
            >
              <PlusIcon className="w-6 h-6" />
            </Button>
          </div>

          <div id="participants">
            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <div className="flex gap-2 justify-between mt-2">
                  <Input
                    {...register(`participants.${index}.username`)}
                    isInvalid={
                      !!(
                        touchedFields.participants &&
                        errors.participants &&
                        touchedFields.participants[index] &&
                        errors.participants[index]
                      )
                    }
                  />
                  <Button
                    onClick={() => remove(index)}
                    variant="transparent-danger"
                    className="rounded-full"
                    type="button"
                  >
                    <CloseIcon />
                  </Button>
                </div>
                <InputFeedback>
                  {errors.participants && errors.participants[index]?.username?.message}
                </InputFeedback>
              </React.Fragment>
            ))}
          </div>

          <Button type="submit" className="block w-full mt-3" disabled={isSubmitting}>
            Crear conversación
          </Button>
        </form>
      </PanelContent>
    </>
  );
}

interface ConversationData {
  friendlyName: string;
  participants: { username: string }[];
}
