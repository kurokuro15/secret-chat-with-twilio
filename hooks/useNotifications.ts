import { NotificationsCtx } from 'contexts';
import { useContext } from 'react';

function useNotifications() {
  const context = useContext(NotificationsCtx);
  if (!context) {
    throw new Error('useNotifications must be used inside a NotificationsProvider');
  }
  return context;
}

export default useNotifications;
