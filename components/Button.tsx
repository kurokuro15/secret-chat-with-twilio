import classNames from 'classnames';
import { forwardRef, ButtonHTMLAttributes } from 'react';

const baseClasses = 'px-4 py-2 mb-2 disabled:cursor-not-allowed';

const variantClasses = {
  primary:
    'text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-md disabled:bg-purple-500',
  'outline-primary':
    'text-purple-800 bg-white border border-purple-800 hover:bg-purple-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-md disabled:bg-black/10 disabled:text-purple-600 disabled:border-purple-600'
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantClasses;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', className, ...other }, ref) => (
    <button
      className={classNames(baseClasses, variantClasses[variant], className)}
      ref={ref}
      {...other}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
