import { ApiError } from '@supabase/supabase-js';
import AppLogo from 'components/icons/AppLogo';
import SignUpForm from 'components/SignUpForm';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SignUp() {
  const router = useRouter();

  function onSuccess() {
    router.push('/login');
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

export default SignUp;
