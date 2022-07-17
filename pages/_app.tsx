import Layout from 'components/Layout';
import { AuthProvider, NotificationsProvider } from 'contexts';
import type { AppProps } from 'next/app';
import 'utils/setupYupLocale';
import '../styles/globals.css';

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
