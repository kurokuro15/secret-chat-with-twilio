import { yupResolver } from '@hookform/resolvers/yup';
import { ApiError } from '@supabase/supabase-js';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Credentials } from 'types/api';
import { object, string } from 'yup';
import Alert from '../Alert';
import Button from '../Button';
import Input from '../forms/Input';
import InputFeedback from '../forms/InputFeedback';
import GithubSignInButton from './GitHubSignInButton';
import Spinner from '../Spinner';

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
  const { signUp, signInWithGithub } = useAuth();
  const [error, setError] = useState<ApiError>();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm<Credentials>({ resolver: yupResolver(schema) });

  async function onSubmit(credentials: Credentials) {
    const { error } = await signUp(credentials);

    if (!error) {
      onSuccess();
      return;
    }

    onError(error);
    setError(error);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error.message}
          </Alert>
        )}

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

        <Button
          className="flex items-center gap-2 justify-center w-full mb-2"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner />} ¡Registrarse!
        </Button>
      </form>

      <GithubSignInButton />
    </>
  );
}

interface SignUpFormProps {
  onSuccess: () => void;
  onError: (error: ApiError) => void;
}

export default SignUpForm;
