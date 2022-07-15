import { ReactNode } from 'react';

export default function ChatContainer({ children }: { children: ReactNode } = { children: null }) {
  return <div className="grow overflow-y-auto rounded-2xl my-2">{children}</div>;
}
