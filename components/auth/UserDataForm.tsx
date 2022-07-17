import { yupResolver } from '@hookform/resolvers/yup';
import Alert from 'components/ui/Alert';
import Button from 'components/ui/Button';
import Input from 'components/forms/Input';
import InputFeedback from 'components/forms/InputFeedback';
import { useAuthCtx } from 'contexts/AuthCtx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import isUsernameAvailable from 'services/isUsernameAvailable';
import { object, string } from 'yup';

const schema = object({
  username: string()
    .matches(/^\w+$/, {
      message: 'Solo puede contener letras y guiones bajos',
      excludeEmptyString: true
    })
    .required()
});

interface UserData {
  username: string;
}

export default function UserDataForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm<UserData>({ resolver: yupResolver(schema) });

  const { updateUserData } = useAuthCtx();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(userData: UserData) {
    const isAvailable = await isUsernameAvailable(userData.username);
    if (!isAvailable) {
      setError('El nombre de usuario no está disponible');
    }
    await updateUserData(userData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}
      <label className="block mb-3">
        <div className="mb-1">Nombre de usuario</div>
        <Input {...register('username')} isInvalid={touchedFields.username && !!errors.username} />
        <InputFeedback>{errors.username?.message}</InputFeedback>
      </label>
      <Button className="w-full mx-auto" disabled={isSubmitting}>
        Continuar
      </Button>
    </form>
  );
}
