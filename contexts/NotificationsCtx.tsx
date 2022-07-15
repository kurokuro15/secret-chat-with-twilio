import useNotifications from 'hooks/useNotifications';
import React, { ReactNode, useContext } from 'react';

const NotificationsCtx = React.createContext<ReturnType<typeof useNotifications> | undefined>(
  undefined
);

function NotificationsProvider({ children }: { children: ReactNode }) {
  const notificationUtils = useNotifications();
  return (
    <NotificationsCtx.Provider value={notificationUtils}>{children}</NotificationsCtx.Provider>
  );
}

function useNotificationsCtx() {
  const context = useContext(NotificationsCtx);
  if (!context) {
    throw new Error('useNotificationsCtx must be used inside a NotificationsProvider');
  }
  return context;
}

export { NotificationsCtx, NotificationsProvider, useNotificationsCtx };
