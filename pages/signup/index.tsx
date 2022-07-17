import { ApiError } from '@supabase/supabase-js';
import { SignUpForm } from 'components/auth';
import { AppLogo } from 'components/icons';
import { useNotifications } from 'hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  const { addNotification } = useNotifications();

  function onSuccess() {
    router.push('/login');

    addNotification({
      message: 'Verifica tu correo electrónico para poder iniciar sesión',
      delay: -1
    });
  }

  function onError(error: ApiError) {
    alert(JSON.stringify(error, null, 2));
  }

  return (
    <main className="w-full h-full flex flex-col justify-center max-w-sm mx-auto p-5">
      <AppLogo className="mx-auto" />
      <h1 className="text-center text-2xl font-bold mb-5">SecretChat - Registrarse</h1>

      <SignUpForm onSuccess={onSuccess} onError={onError} />

      <Link href="/login">
        <a>¿Ya tienes cuenta? ¡Inicia sesión!</a>
      </Link>
    </main>
  );
}
