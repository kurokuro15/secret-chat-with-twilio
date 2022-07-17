import React, { ReactNode, useState } from 'react';
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

  return (
    <SidebarCtx.Provider
      value={{
        show,
        toggleSidebar: () => setShow((prev) => !prev),
        currentPanel,
        changePanel: (panel) => setCurrentPanel(panel)
      }}
    >
      {children}
    </SidebarCtx.Provider>
  );
}

export { SidebarProvider, SidebarCtx };
