import useNotifications from 'hooks/useNotifications';
import React, { ReactNode, useContext } from 'react';

const defaultState = {
  notifications: [],
  addNotification: () => -1,
  deleteNotification: () => null
};

const NotificationsCtx = React.createContext<ReturnType<typeof useNotifications>>(defaultState);

function NotificationsProvider({ children }: { children: ReactNode }) {
  const notificationUtils = useNotifications();
  return (
    <NotificationsCtx.Provider value={notificationUtils}>{children}</NotificationsCtx.Provider>
  );
}

function useNotificationsCtx() {
  return useContext(NotificationsCtx);
}

export { NotificationsCtx, NotificationsProvider, useNotificationsCtx };
