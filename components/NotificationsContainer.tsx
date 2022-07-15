import { useNotificationsCtx } from 'contexts/NotificationsCtx';
import Notification from './Notification';

function NotificationsContainer() {
  const { notifications } = useNotificationsCtx();

  return (
    <div className="w-full max-w-sm px-5 pt-2 md:pt-0 md:pb-2 fixed top-0 left-1/2 -translate-x-1/2 md:top-full md:left-full md:-translate-y-full md:-translate-x-full">
      <div className="flex flex-col gap-3">
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  );
}

export default NotificationsContainer;
