import { ReactNode, Suspense } from 'react';
import FullPageSpinner from './FullPageSpinner';
import NotificationsContainer from './ui/NotificationsContainer';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-auto">
      <Suspense fallback={<FullPageSpinner />}>
        {children}
        <NotificationsContainer />
        <div id="modalRoot" />
      </Suspense>
    </div>
  );
}

export default Layout;
