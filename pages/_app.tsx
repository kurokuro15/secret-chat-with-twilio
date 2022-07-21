require('intersection-observer');
import Layout from 'components/Layout';
import { AuthProvider, NotificationsProvider } from 'contexts';
import type { AppProps } from 'next/app';
import 'utils/setupYupLocale';
import '../styles/globals.css';
import Head from 'next/head';
const matchAll = require('string.prototype.matchall');

if (String.prototype.matchAll === undefined) matchAll.shim();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Secret Chat</title>
        <meta name="description" content="secret chat by Yhan \& Reynaldo" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <NotificationsProvider>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </NotificationsProvider>
    </>
  );
}

export default MyApp;
