import { ReactNode, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import onClickOutside from 'utils/onClickOutside';

export default function Overlay({ content, children, position = 'top' }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => {
          setShow(true);
          onClickOutside(ref, () => setShow(false));
        }}
      >
        {children}
      </div>
      {show && (
        <div ref={ref} className={twMerge('absolute', positionClasses[position])}>
          {content}
        </div>
      )}
    </div>
  );
}

const positionClasses = {
  top: 'bottom-full -translate-y-3',
  bottom: 'top-full translate-y-3',
  left: 'right-full -translate-x-3',
  right: 'left-full translate-x-3'
};

interface OverlayProps {
  content: JSX.Element;
  children: ReactNode;
  position: 'top' | 'bottom' | 'left' | 'right';
}
