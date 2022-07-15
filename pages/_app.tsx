import '../styles/globals.css';
import 'utils/setupYupLocale';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import { AuthProvider } from 'contexts/AuthCtx';
import { NotificationsProvider } from 'contexts/NotificationsCtx';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationsProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </NotificationsProvider>
  );
}

export default MyApp;
