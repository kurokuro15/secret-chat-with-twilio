import { SidebarCtx } from 'contexts';
import { useContext } from 'react';

export default function useSidebar() {
  const context = useContext(SidebarCtx);
  if (context === undefined) {
    throw new Error('useSidebar must be use inside a SidebarProvider');
  }
  return context;
}
