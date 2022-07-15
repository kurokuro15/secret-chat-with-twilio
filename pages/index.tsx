import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Secret Chat</title>
        <meta name="description" content="secret chat by Yhan \& Reynaldo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{' '}
          <Link href="/chat">
            <a className="text-blue-900 text-7xl">Secret Chat!</a>
          </Link>
        </h1>
      </main>
    </div>
  );
};

export default Home;
