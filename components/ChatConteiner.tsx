import { ReactNode, useEffect, useRef } from 'react';

export default function ChatContainer({ children }: { children: ReactNode } = { children: null }) {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef.current?.scrollTo({ top: divRef.current.scrollHeight });
  });
  return (
    <div ref={divRef} className="grow overflow-y-auto rounded-2xl my-2">
      {children}
    </div>
  );
}
