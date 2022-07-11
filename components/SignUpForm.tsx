import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from './Button';
import Input from './forms/Input';
import InputFeedback from './forms/InputFeedback';
import { Credentials } from 'types/api';
import useAuth from 'hooks/useAuth';
import { ApiError } from '@supabase/supabase-js';

const schema = object({
  email: string().email().required(),
  password: string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      'Debe tener al menos 6 caracteres, un número, una mínuscula y una mayúscula'
    )
    .required()
});

function SignUpForm({ onSuccess, onError }: SignUpFormProps) {
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields }
  } = useForm<Credentials>({ resolver: yupResolver(schema) });

  async function onSubmit(credentials: Credentials) {
    const { error, ...rest } = await signUp(credentials);

    console.log(rest);

    if (!error) {
      onSuccess();
      return;
    }

    onError(error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="block mb-3">
        <div className="mb-1">Correo electrónico</div>
        <Input {...register('email')} isInvalid={!!touchedFields.email && !!errors.email} />
        <InputFeedback>{errors.email?.message}</InputFeedback>
      </label>

      <label className="block mb-3">
        <div className="mb-1">Contraseña</div>
        <Input
          type="password"
          {...register('password')}
          isInvalid={!!touchedFields.password && !!errors.password}
        />
        <InputFeedback>{errors.password?.message}</InputFeedback>
      </label>

      <Button className="block w-full">¡Registrarse!</Button>
    </form>
  );
}

interface SignUpFormProps {
  onSuccess: () => void;
  onError: (error: ApiError) => void;
}

export default SignUpForm;
