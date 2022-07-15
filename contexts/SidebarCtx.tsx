import React, { ReactNode, useContext, useState } from 'react';

interface SidebarCtx {
  show: boolean;
  toggleSidebar: () => void;
}

const SidebarCtx = React.createContext<SidebarCtx | undefined>(undefined);

function SidebarProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(true);

  return (
    <SidebarCtx.Provider value={{ show, toggleSidebar: () => setShow((prev) => !prev) }}>
      {children}
    </SidebarCtx.Provider>
  );
}

function useSidebarCtx() {
  const context = useContext(SidebarCtx);
  if (context === undefined) {
    throw new Error('useSidebarCtx must be use inside a SidebarProvider');
  }
  return context;
}

export { SidebarProvider, useSidebarCtx };
