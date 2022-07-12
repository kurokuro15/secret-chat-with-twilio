import '../styles/globals.css';
import 'utils/setupYupLocale';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import { AuthProvider } from 'contexts/AuthCtx';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
