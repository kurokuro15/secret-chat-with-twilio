import { twMerge } from 'tailwind-merge';

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        'animate-spin border-4 border-black/20 w-4 h-4 rounded-full border-l-inherit inline-block',
        className
      )}
    ></div>
  );
}
