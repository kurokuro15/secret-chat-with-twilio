import { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return <div className="h-screen w-screen">{children}</div>;
}
export default Layout;
