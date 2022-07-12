import { useRouter } from 'next/router';
import { useEffect } from 'react';
import setAuthToken from 'services/setAuthToken';
import { Credentials } from 'types/api';
import { supabase } from 'utils/supabaseClient';

function useAuth() {
  const router = useRouter();

  async function signIn(credentials: Credentials) {
    return await supabase.auth.signIn(credentials);
  }

  async function signUp(credentials: Credentials) {
    return await supabase.auth.signUp(credentials);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      const newUser = supabase.auth.user();
      if (newUser) {
        await setAuthToken(event, session);
      }
    });
  }, []);

  return {
    signIn,
    signUp,
    signOut,
    jwt: supabase.auth.session()?.access_token,
    user: supabase.auth.user()
  };
}

export default useAuth;
