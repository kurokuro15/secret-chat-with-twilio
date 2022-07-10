import { ReactNode } from 'react';

interface InputFeedbackProps {
  children?: ReactNode;
}

export default function InputFeedback({ children }: InputFeedbackProps) {
  return <p className="mt-2 text-sm text-red-600">{children}</p>;
}
