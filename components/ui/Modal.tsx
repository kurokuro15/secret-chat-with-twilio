import { CloseIcon } from 'components/icons';
import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

function Modal({
  className,
  bgClassName,
  children,
  show,
  ...props
}: {
  className?: string;
  bgClassName?: string;
  children: ReactNode;
  show: boolean;
}) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>();

  useEffect(() => {
    setModalRoot(document.getElementById('modalRoot'));
  }, []);

  if (!modalRoot) return <p>There&apos;s no modalRoot element</p>;

  if (!show) return null;

  return ReactDOM.createPortal(
    <div
      className={twMerge(
        'w-screen h-screen absolute backdrop-blur-lg top-0 left-0 bg-black/30 flex items-center justify-center z-20',
        bgClassName
      )}
    >
      <div
        className={twMerge(
          'bg-white rounded-md p-3 flex flex-col divide-y max-h-screen',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}

function Header({
  className,
  children,
  onClose,
  ...props
}: {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
}) {
  return (
    <div
      className={twMerge(
        'text-lg font-bold pb-3 flex gap-3 items-center justify-between',
        className
      )}
      {...props}
    >
      <div>{children}</div>
      {onClose && (
        <Button variant="transparent-danger" className="rounded-full" onClick={onClose}>
          <CloseIcon />
        </Button>
      )}
    </div>
  );
}

function Body({ className, children, ...props }: { className?: string; children: ReactNode }) {
  return (
    <div className={twMerge('pt-3 overflow-auto px-2', className)} {...props}>
      {children}
    </div>
  );
}

Modal.Header = Header;
Modal.Body = Body;

export default Modal;
