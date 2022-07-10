import AppLogo from 'components/icons/AppLogo';
import LoginForm from 'components/LoginForm';
import Link from 'next/link';

function Login() {
  return (
    <main className="w-full h-full flex flex-col justify-center max-w-sm mx-auto p-5">
      <AppLogo className="mx-auto" />
      <h1 className="text-center text-2xl font-bold mb-5">SecretChat - Login</h1>

      <LoginForm />

      <Link href="/login">
        <a>¿No tienes cuenta? ¡Regístrate ahora!</a>
      </Link>
    </main>
  );
}

export default Login;
