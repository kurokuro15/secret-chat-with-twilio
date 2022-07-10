import Button from 'components/Button';
import Input from 'components/forms/Input';
import AppLogo from 'components/icons/AppLogo';
import InputFeedback from 'components/forms/InputFeedback';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields }
  } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <main className="w-full h-full flex flex-col justify-center max-w-sm mx-auto p-5">
      <AppLogo className="mx-auto" />
      <h1 className="text-center text-2xl font-bold mb-5">SecretChat - Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block mb-3">
          <div className="mb-1">Correo electrónico</div>
          <Input
            type="email"
            {...register('email', { required: 'Requerido' })}
            isInvalid={touchedFields.email && errors.email}
          />
          <InputFeedback>{errors.email?.message}</InputFeedback>
        </label>

        <label className="block mb-3">
          <div className="mb-1">Contraseña</div>
          <Input
            type="password"
            {...register('password', { required: 'Requerido' })}
            isInvalid={touchedFields.password && errors.password}
          />
          <InputFeedback>{errors.password?.message}</InputFeedback>
        </label>

        <Button className="block w-full">Iniciar sesión</Button>
      </form>

      <Link href="/login">
        <a>¿No tienes cuenta? ¡Regístrate ahora!</a>
      </Link>
    </main>
  );
}

export default Login;
