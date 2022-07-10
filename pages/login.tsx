import Button from 'components/Button';
import Input from 'components/forms/Input';
import AppLogo from 'components/icons/AppLogo';
import Link from 'next/link';

function Login() {
  return (
    <main className="w-full h-full flex flex-col justify-center max-w-sm mx-auto py-5">
      <AppLogo className="mx-auto" />
      <h1 className="text-center text-2xl font-bold mb-5">SecretChat - Login</h1>

      <form>
        <label className="block mb-3">
          <div className="mb-1">Correo electrónico</div>
          <Input type="email" />
        </label>

        <label className="block mb-3">
          <div className="mb-1">Contraseña</div>
          <Input type="password" required />
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
