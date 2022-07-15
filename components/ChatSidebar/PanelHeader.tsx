import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

function PanelHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={twMerge('py-3 px-2 bg-white border-b border-b-purple-500', className)}>
      {children}
    </div>
  );
}

export default PanelHeader;
