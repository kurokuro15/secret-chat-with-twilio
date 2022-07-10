import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from './Button';
import Input from './forms/Input';
import InputFeedback from './forms/InputFeedback';

interface Credentials {
  email: string;
  password: string;
}

const schema = object({
  email: string().email().required(),
  password: string().required()
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields }
  } = useForm<Credentials>({ resolver: yupResolver(schema) });

  function onSubmit(data: Credentials) {
    console.log(data);
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
