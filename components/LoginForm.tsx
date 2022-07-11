import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from './Button';
import Input from './forms/Input';
import InputFeedback from './forms/InputFeedback';
import { Credentials } from 'types/api';
import useAuth from 'hooks/useAuth';

const schema = object({
  email: string().email().required(),
  password: string().required()
});

function LoginForm() {
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields }
  } = useForm<Credentials>({ resolver: yupResolver(schema) });

  async function onSubmit(credentials: Credentials) {
    console.log(await signIn(credentials));
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

      <Button className="block w-full">Iniciar sesión</Button>
    </form>
  );
}

export default LoginForm;
