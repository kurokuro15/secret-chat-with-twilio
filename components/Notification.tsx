import { twMerge } from 'tailwind-merge';
import CloseIcon from './icons/CloseIcon';

interface NotificationProps {
  variant?: keyof typeof variants;
  message: string;
  close: () => void;
}

const baseClasses = 'cursor-pointer border p-3 grow max-w-sm rounded-md relative';

export const variants = {
  primary: 'border-purple-700 bg-purple-200 text-purple-900 hover:bg-purple-100',
  success: 'border-emerald-700 bg-emerald-200 text-emerald-900 hover:bg-emerald-100',
  danger: 'border-red-700 bg-red-200 text-red-900 hover:bg-red-100'
};

function Notification({ variant = 'primary', message, close }: NotificationProps) {
  return (
    <div className={twMerge(baseClasses, variants[variant])}>
      <div className="absolute right-1 top-1 cursor-pointer hover:scale-110" onClick={close}>
        <CloseIcon className="w-4 h-4" />
      </div>
      {message}
    </div>
  );
}

export default Notification;
