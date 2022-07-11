import classNames from 'classnames';
import { IconProps } from './IconProps';

export default function PlusIcon({ className, size = 6 }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(`h-${size} w-${size}`, className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}
