import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import setAuthToken from 'services/setAuthToken';
import { Credentials } from 'types/api';
import { supabase } from 'utils/supabaseClient';

function useAuth() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [userData, setUserData] = useState<Partial<UserData>>();

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
      if (userData.avatar_url) {
        const avatar_url = await getAvatar(userData.avatar_url);
        setUserData((prev) => ({ ...prev, ...userData, avatar_url }));
      } else {
        setUserData((prev) => ({ ...prev, ...userData }));
      }
    }

    return result;
  }

  const getAvatar = useCallback(
    async (url: string) => {
      const { data } = await supabase.from('profiles').select('avatar_url').eq('id', user?.id);

      if (data && data[0].avatar_url) {
        const { data: img } = await supabase.storage.from('avatars').download(url);
        const avatarUrl = img && URL.createObjectURL(img);
        return avatarUrl ?? undefined;
      }
    },
    [user?.id]
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => await setAuthToken(event, session));
  }, []);

  useEffect(() => {
    async function getUserData() {
      const { data } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user?.id);

      if (data && data[0].avatar_url) {
        const avatar_url = await getAvatar(data[0].avatar_url);
        setUserData(data && { ...data[0], avatar_url });
      }
    }
    getUserData();
  }, [user, getAvatar]);

  return {
    signIn,
    signInWithGithub,
    signUp,
    signOut,
    updateUserData,
    getAvatar,
    jwt: supabase.auth.session()?.access_token,
    user: userData
      ? {
          ...user,
          ...userData
        }
      : null
  };
}

export default useAuth;

interface UserData {
  username: string;
  avatar_url: string;
}
