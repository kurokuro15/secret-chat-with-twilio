import { twMerge } from 'tailwind-merge';
import { ReactNode } from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: keyof typeof variants;
}

const variants = {
  primary: 'bg-blue-100 text-blue-700 border border-blue-700',
  success: 'bg-emerald-100 text-emerald-700 border border-emerald-700',
  danger: 'bg-red-100 text-red-700 border border-red-700'
};

export default function Alert({ children, variant = 'primary', className }: AlertProps) {
  return <div className={twMerge('rounded-md p-3', variants[variant], className)}>{children}</div>;
}
