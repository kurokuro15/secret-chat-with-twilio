import { twMerge } from 'tailwind-merge';
import { forwardRef, ButtonHTMLAttributes } from 'react';

const baseClasses =
  'px-4 py-2 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-4 font-medium rounded-md';

const variantClasses = {
  primary:
    'text-white bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 disabled:bg-purple-500',
  black: 'text-white bg-black hover:bg-gray-800 focus:ring-black/30 disabled:bg-gray-600',
  'outline-primary':
    'text-purple-800 bg-white border border-purple-800 hover:bg-purple-800 hover:text-white focus:ring-purple-300 disabled:bg-black/10 disabled:text-purple-600 disabled:border-purple-600',
  'transparent-primary':
    'p-1 text-purple-800 hover:bg-purple-500/10 focus:ring-purple-200 disabled:bg-black/10',
  'transparent-danger': 'p-1 text-red-500 hover:bg-red-100 focus:ring-red-300 disabled:bg-black/10'
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className, ...other }, ref) => (
    <button
      className={twMerge(baseClasses, variantClasses[variant], className)}
      ref={ref}
      {...other}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
