import { Credentials } from 'types/api';
import { supabase } from 'utils/supabaseClient';

function useAuth() {
  function signIn(credentials: Credentials) {
    return supabase.auth.signIn(credentials);
  }

  function signUp(credentials: Credentials) {
    return supabase.auth.signUp(credentials);
  }

  function signOut() {
    return supabase.auth.signOut();
  }

  return {
    signIn,
    signUp,
    signOut,
    jwt: supabase.auth.session()?.access_token,
    user: supabase.auth.user()
  };
}

export default useAuth;
