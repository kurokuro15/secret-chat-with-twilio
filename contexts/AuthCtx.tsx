import React, { ReactNode } from 'react';

const AuthCtx = React.createContext<ReturnType<typeof useAuthCtx> | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const authUtils = useAuthCtx();
  return <AuthCtx.Provider value={authUtils}>{children}</AuthCtx.Provider>;
}

import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import setAuthToken from 'services/setAuthToken';
import { Credentials } from 'types/api';
import { supabase } from 'utils/supabaseClient';

function useAuthCtx() {
  const router = useRouter();
  const user = supabase.auth.user();
  const [userData, setUserData] = useState<UserData>();

  const signIn = useCallback(async function (credentials: Credentials) {
    return await supabase.auth.signIn(credentials);
  }, []);

  const signInWithGithub = useCallback(async function () {
    return await supabase.auth.signIn({
      provider: 'github'
    });
  }, []);

  const signUp = useCallback(async function (credentials: Credentials) {
    return await supabase.auth.signUp(credentials);
  }, []);

  const signOut = useCallback(
    async function () {
      await supabase.auth.signOut();
      router.push('/login');
    },
    [router]
  );

  const updateUserData = useCallback(
    async function (userData: UserData) {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...userData
        })
        .eq('id', user?.id);

      if (!error) {
        setUserData((prev) => ({ ...prev, ...userData }));
      }

      return {
        error
      };
    },
    [user?.id]
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => await setAuthToken(event, session));
  }, []);

  useEffect(() => {
    async function getUserData() {
      if (!user) return;
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
      avatar_url: getAvatarUrl(userData.avatar_url),
      email: user?.email
    }
  };
}

function getAvatarUrl(path?: string) {
  return (path && supabase.storage.from('avatars').getPublicUrl(path).publicURL) || null;
}
interface UserData {
  username?: string;
  avatar_url?: string;
}

export { AuthCtx, AuthProvider };
