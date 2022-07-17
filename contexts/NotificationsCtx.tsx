import { variants } from 'components/ui/Notification';
import React, { ReactNode, useState } from 'react';

const NotificationsCtx = React.createContext<ReturnType<typeof useNotificationsCtx> | undefined>(
  undefined
);

function NotificationsProvider({ children }: { children: ReactNode }) {
  const notificationUtils = useNotificationsCtx();
  return (
    <NotificationsCtx.Provider value={notificationUtils}>{children}</NotificationsCtx.Provider>
  );
}

function useNotificationsCtx() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nextId, setNextId] = useState(0);

  /** Adds a notification. If delay is -1 then it won't be deleted automatically. Default delay
   * is 5000 ms.
   * @returns notification id
   */
  function addNotification(options: AddNotificationOptions) {
    const id = nextId;
    setNextId((prev) => prev + 1);

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
  }

  function deleteNotification(notificationId: number) {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId));
  }

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
  id: number;
  close: () => void;
}
