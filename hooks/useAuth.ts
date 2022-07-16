import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import setAuthToken from 'services/setAuthToken';
import { Credentials } from 'types/api';
import { supabase } from 'utils/supabaseClient';

function useAuth() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [userData, setUserData] = useState<Partial<UserData>>({});

  async function signIn(credentials: Credentials) {
    return await supabase.auth.signIn(credentials);
  }

  async function signInWithGithub() {
    return await supabase.auth.signIn({
      provider: 'github'
    });
  }

  async function signUp(credentials: Credentials) {
    return await supabase.auth.signUp(credentials);
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  async function updateUserData(userData: Partial<UserData>) {
    const result = await supabase
      .from('profiles')
      .update({ ...userData })
      .eq('id', user?.id);

    if (!result.error) {
      setUserData(userData);
    }

    return result;
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => await setAuthToken(event, session));
  }, []);

  useEffect(() => {
    async function getUserData() {
      const { data } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user?.id);
      setUserData(data && data[0]);
    }
    getUserData();
  }, [user]);

  return {
    signIn,
    signInWithGithub,
    signUp,
    signOut,
    updateUserData,
    jwt: supabase.auth.session()?.access_token,
    user: {
      ...user,
      ...userData
    }
  };
}

export default useAuth;

interface UserData {
  username: string;
  avatar_url: string;
}
