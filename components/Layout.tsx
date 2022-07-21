import { ReactNode } from 'react';
import NotificationsContainer from './ui/NotificationsContainer';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-auto">
      {children}
      <NotificationsContainer />
      <div id="modalRoot" />
    </div>
  );
}

export default Layout;
