import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import Input from 'components/forms/Input';
import Button from 'components/Button';
import InputFeedback from 'components/forms/InputFeedback';
import { useAuthCtx } from 'contexts/AuthCtx';

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

  async function onSubmit(userData: UserData) {
    const { data, error } = await updateUserData(userData);
    console.log(data, error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
