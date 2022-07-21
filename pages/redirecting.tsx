import FullPageSpinner from 'components/FullPageSpinner';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Redirecting() {
  const router = useRouter();

  useEffect(() => {
    const timerId = setTimeout(() => {
      router.replace('/chat');
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [router]);

  return <FullPageSpinner />;
}
