import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import setAuthToken from 'services/setAuthToken';
import { Credentials } from 'types/api';
import { supabase } from 'utils/supabaseClient';

function useAuth() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [userData, setUserData] = useState<UserData>();

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

  async function updateUserData(userData: UserData) {
    const { error } = await supabase
      .from('profiles')
      .update({ ...userData })
      .eq('id', user?.id);

    if (!error) {
      setUserData((prev) => ({ ...prev, ...userData }));
    }
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

      setUserData(data && { ...data[0] });
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
    user: userData && {
      ...userData,
      avatar_url: getAvatarUrl(userData?.avatar_url),
      email: user?.email
    }
  };
}

export default useAuth;

function getAvatarUrl(path?: string) {
  return (path && supabase.storage.from('avatars').getPublicUrl(path).publicURL) || null;
}
interface UserData {
  username?: string;
  avatar_url?: string;
}
