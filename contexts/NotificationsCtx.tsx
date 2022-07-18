import { variants } from 'components/ui/Notification';
import React, { ReactNode, useCallback, useState } from 'react';

const NotificationsCtx = React.createContext<NotificationsContext | undefined>(undefined);

function NotificationsProvider({ children }: { children: ReactNode }) {
  const notificationUtils = useNotificationsCtx();
  return (
    <NotificationsCtx.Provider value={notificationUtils}>{children}</NotificationsCtx.Provider>
  );
}

function useNotificationsCtx() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId));
  }, []);

  /** Adds a notification. If delay is -1 then it won't be deleted automatically. Default delay
   * is 5000 ms.
   * @returns notification id
   */
  const addNotification = useCallback(
    (options: AddNotificationOptions) => {
      const id = options.message + Date.now();

      setNotifications((prev) => {
        const notification: Notification = {
          ...options,
          id,
          close: () => {
            options.onClose && options.onClose();
            deleteNotification(id);
          }
        };

        if (notification.delay !== -1)
          setTimeout(() => deleteNotification(notification.id), notification.delay ?? 5000);

        return [...prev, notification];
      });
      return id;
    },
    [deleteNotification]
  );

  return {
    addNotification,
    deleteNotification,
    notifications
  };
}

export { NotificationsCtx, NotificationsProvider };

export interface AddNotificationOptions {
  message: string;
  variant?: keyof typeof variants;
  delay?: number;
  onClose?: () => void;
}

export interface Notification extends AddNotificationOptions {
  id: string;
  close: () => void;
}

type NotificationsContext = ReturnType<typeof useNotificationsCtx>;
