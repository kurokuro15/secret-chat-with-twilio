import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Panel } from 'components/ChatSidebar';
import { useConversations } from 'hooks';

interface SidebarCtx {
  show: boolean;
  toggleSidebar: () => void;
  currentPanel: Panel;
  changePanel: (panel: Panel) => void;
  isMobile: boolean;
}

const SidebarCtx = React.createContext<SidebarCtx | undefined>(undefined);

function SidebarProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(true);
  const [currentPanel, setCurrentPanel] = useState<Panel>('conversations');
  const [isMobile, setIsMobile] = useState(false);

  const { selectedConversation } = useConversations();

  const toggleSidebar = useCallback(() => setShow((prev) => !prev), []);
  const changePanel = useCallback((panel: Panel) => setCurrentPanel(panel), []);

  useEffect(() => {
    function checkWidth() {
      setIsMobile(window.innerWidth < 1024);
    }
    window.addEventListener('resize', checkWidth);

    if (!selectedConversation) {
      setShow(true);
    } else {
      if (isMobile) {
        setShow(false);
      }
    }

    return () => window.removeEventListener('resize', checkWidth);
  }, [selectedConversation, isMobile]);

  return (
    <SidebarCtx.Provider
      value={{
        show,
        toggleSidebar,
        currentPanel,
        changePanel,
        isMobile
      }}
    >
      {children}
    </SidebarCtx.Provider>
  );
}

export { SidebarProvider, SidebarCtx };
