import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  disabled?: boolean;
}

const baseClasses =
  'block w-full px-3 py-1 border border-slate-400 rounded-md focus:outline-none focus:ring-purple-500 focus:ring-1 focus:border-purple-500';

const disabledClasses = 'bg-gray-100 text-gray-700 cursor-not-allowed';

const invalidClasses = 'border-red-400 text-red-500 focus:border-red-400 focus:ring-red-400';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type = 'text', disabled = false, isInvalid = false, ...other } = props;

  const className = classNames(baseClasses, {
    [disabledClasses]: disabled,
    [invalidClasses]: isInvalid
  });

  return <input type={type} className={className} ref={ref} disabled={disabled} {...other} />;
});

Input.displayName = 'Input';

export default Input;
