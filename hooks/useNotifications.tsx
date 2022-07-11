import { variants } from 'components/Notification';
import { useState } from 'react';

export interface NotificationOptions {
  message: string;
  variant?: keyof typeof variants;
  delay?: number;
  onClose?: () => void;
}

export interface Notification extends NotificationOptions {
  id: number;
  close: () => void;
}

function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nextId, setNextId] = useState(0);

  /** Adds a notification. If delay is -1 then it won't be deleted automatically. Default delay
   * is 5000 ms.
   * @returns notification id
   */
  function addNotification(options: NotificationOptions) {
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

export default useNotifications;
