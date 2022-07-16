import { ReactNode } from 'react';
import NotificationsContainer from './NotificationsContainer';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen">
      {children}
      <NotificationsContainer />
      <div id="modalRoot" />
    </div>
  );
}

export default Layout;
