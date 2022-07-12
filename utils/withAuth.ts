import { GetServerSideProps } from 'next';
import { supabase } from './supabaseClient';

interface WithAuthOptions {
  redirectTo?: string;
  getServerSideProps?: GetServerSideProps;
}

/**
 * Verifies that the user is logged in, otherwhise, redirects to login or the given route.
 * If getServerSideProps is given inside options, merges the props with the user data
 */
export function withAuth(options?: WithAuthOptions): GetServerSideProps {
  return async (ctx) => {
    const { redirectTo = '/login', getServerSideProps } = options ?? {};

    const { req } = ctx;
    const authResult = await supabase.auth.api.getUserByCookie(req);

    if (authResult.error) {
      return {
        redirect: {
          destination: redirectTo,
          permanent: false
        }
      };
    }

    let props = { ...authResult };
    let res;

    if (getServerSideProps) {
      res = await getServerSideProps(ctx);
      if ('props' in res) props = { ...res.props, ...authResult };
    }

    return {
      props,
      ...res
    };
  };
}
