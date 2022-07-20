import React, { ReactNode, useCallback, useState } from 'react';
import { Panel } from 'components/ChatSidebar';

interface SidebarCtx {
  show: boolean;
  toggleSidebar: () => void;
  currentPanel: Panel;
  changePanel: (panel: Panel) => void;
}

const SidebarCtx = React.createContext<SidebarCtx | undefined>(undefined);

function SidebarProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(true);
  const [currentPanel, setCurrentPanel] = useState<Panel>('conversations');

  const toggleSidebar = useCallback(() => setShow((prev) => !prev), []);
  const changePanel = useCallback((panel: Panel) => setCurrentPanel(panel), []);

  return (
    <SidebarCtx.Provider
      value={{
        show,
        toggleSidebar,
        currentPanel,
        changePanel
      }}
    >
      {children}
    </SidebarCtx.Provider>
  );
}

export { SidebarProvider, SidebarCtx };
