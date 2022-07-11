import CloseIcon from './icons/CloseIcon';

interface NotificationProps {
  variant?: string;
  message: string;
  close: () => void;
}

function Notification({ variant = 'primary', message, close }: NotificationProps) {
  return (
    <div className="cursor-pointer border border-purple-700 bg-purple-200 text-purple-900 p-3 grow max-w-sm rounded-md relative hover:scale-[1.01]">
      <div className="absolute right-1 top-1 cursor-pointer hover:scale-110" onClick={close}>
        <CloseIcon className="w-4 h-4" />
      </div>
      {message}
    </div>
  );
}

export default Notification;
