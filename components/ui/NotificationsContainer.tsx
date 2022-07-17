import { useNotificationsCtx } from 'contexts';
import Notification from './Notification';

function NotificationsContainer() {
  const { notifications } = useNotificationsCtx();

  return (
    <div className="w-full max-w-sm px-5 pt-2 lg:pt-0 lg:pb-2 fixed top-0 left-1/2 -translate-x-1/2 lg:top-full lg:left-full lg:-translate-y-full lg:-translate-x-full">
      <div className="flex flex-col gap-3">
        {notifications.map((notification) => (
          <Notification key={notification.id} {...notification} />
        ))}
      </div>
    </div>
  );
}

export default NotificationsContainer;
