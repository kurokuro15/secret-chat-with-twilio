import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { twMerge } from 'tailwind-merge';

function Modal({
  className,
  children,
  show,
  ...props
}: {
  className?: string;
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
    <div className="w-screen h-screen absolute backdrop-blur-lg top-0 left-0 bg-black/30 flex items-center justify-center z-20">
      <div
        className={twMerge('fixed bg-white rounded-md p-3 flex flex-col divide-y', className)}
        {...props}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
}

function Header({ className, children, ...props }: { className?: string; children: ReactNode }) {
  return (
    <div className={twMerge('text-lg font-bold pb-3', className)} {...props}>
      {children}
    </div>
  );
}

function Body({ className, children, ...props }: { className?: string; children: ReactNode }) {
  return (
    <div className={twMerge('pt-3', className)} {...props}>
      {children}
    </div>
  );
}

Modal.Header = Header;
Modal.Body = Body;

export default Modal;
