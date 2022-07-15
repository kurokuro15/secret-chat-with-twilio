import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export default function PanelContent({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={twMerge('p-3 max-h-full overflow-auto', className)}>{children}</div>;
}
