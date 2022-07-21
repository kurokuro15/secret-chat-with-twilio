import { AppLogo } from 'components/icons';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import homeImage from 'public/home.svg';

const Home: NextPage = () => {
  return (
    <div className="flex max-w-md mx-auto py-10 px-5 items-center h-full">
      <Head>
        <title>Secret Chat</title>
        <meta name="description" content="secret chat by Yhan \& Reynaldo" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="text-center">
        <AppLogo className="mx-auto w-32 h-32" />
        <h1 className="text-5xl mb-3">
          Bienvenido a <div className="text-purple-700">¡Secret Chat!</div>
        </h1>
        <p>Un lugar donde podrás compartir y charlar con tus amigos de forma segura</p>
        <Image
          src={homeImage}
          alt="Grupo de personas con burbujas de discurso"
          layout="responsive"
        />
        <Link href="/chat">
          <a className="px-3 py-2 bg-purple-700 rounded-md mt-5 font-bold hover:bg-purple-600">
            <span className="text-white">Chatear ahora!</span>
          </a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
