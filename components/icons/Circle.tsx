import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Circle(props: HTMLProps<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={twMerge('grow-0 m-1 aspect-square w-4 h-4 rounded-full border-2', props.className)}
    ></span>
  );
}
