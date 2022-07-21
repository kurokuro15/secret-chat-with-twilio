import Spinner from 'components/ui/Spinner';
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

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="w-10 h-10" />
    </div>
  );
}
