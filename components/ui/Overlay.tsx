import { DOMAttributes, ReactNode, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import onClickOutside from 'utils/onClickOutside';

export default function Overlay({
  content,
  children,
  position = 'top',
  event = 'onClick'
}: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  const trigger = () => {
    setShow(true);
    onClickOutside(ref, () => setShow(false));
  };

  return (
    <div className="relative">
      <div
        onClick={event === 'onClick' ? trigger : undefined}
        onContextMenu={
          event === 'onContextMenu'
            ? (e) => {
                e.preventDefault();
                trigger();
              }
            : undefined
        }
      >
        {children}
      </div>
      {show && (
        <div ref={ref} className={twMerge('absolute z-20', positionClasses[position])}>
          {content}
        </div>
      )}
    </div>
  );
}

const positionClasses = {
  top: 'bottom-full -translate-y-3',
  bottom: 'top-full translate-y-3',
  'bottom-center': 'top-full left-1/2 -translate-x-1/2 translate-y-2',
  left: 'right-full -translate-x-3',
  right: 'left-full translate-x-3'
};

interface OverlayProps {
  content: JSX.Element;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'bottom-center';
  event?: 'onClick' | 'onContextMenu';
}
