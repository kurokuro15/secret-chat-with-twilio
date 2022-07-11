import { NotificationsProvider } from 'contexts/NotificationsCtx';
import { ReactNode } from 'react';
import NotificationsContainer from './NotificationsContainer';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <NotificationsProvider>
        {children}
        <NotificationsContainer />
      </NotificationsProvider>
    </div>
  );
}

export default Layout;
