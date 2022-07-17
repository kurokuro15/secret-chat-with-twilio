import { yupResolver } from '@hookform/resolvers/yup';
import { ApiError } from '@supabase/supabase-js';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Credentials } from 'types/api';
import { object, string } from 'yup';
import Alert from '../Alert';
import Button from '../ui/Button';
import Input from '../forms/Input';
import InputFeedback from '../forms/InputFeedback';
import GithubSignInButton from './GitHubSignInButton';
import Spinner from '../ui/Spinner';

const schema = object({
  email: string().email().required(),
  password: string().required()
});

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const { signIn } = useAuth();
  const [error, setError] = useState<ApiError | null>();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm<Credentials>({ resolver: yupResolver(schema) });

  async function onSubmit(credentials: Credentials) {
    const { error } = await signIn(credentials);
    if (!error) {
      onSuccess();
    }

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
          className="w-full flex items-center justify-center gap-2 mb-2"
          disabled={isSubmitting}
        >
          {isSubmitting && <Spinner />} Iniciar sesión
        </Button>
      </form>
      <GithubSignInButton />
    </>
  );
}

interface LoginFormProps {
  onSuccess: () => void;
}
