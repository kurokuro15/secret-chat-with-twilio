import ConversationsPanel from 'components/ChatSidebar/ConversationsPanel';
import CreateConversationPanel from 'components/ChatSidebar/CreateConversationPanel';
import SettingsPanel from 'components/ChatSidebar/SettingsPanel';
import React, { ReactNode, useContext, useState } from 'react';

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

function useSidebarCtx() {
  const context = useContext(SidebarCtx);
  if (context === undefined) {
    throw new Error('useSidebarCtx must be use inside a SidebarProvider');
  }
  return context;
}

export { SidebarProvider, useSidebarCtx };

export type Panel = keyof typeof panels;

export const panels = {
  conversations: ConversationsPanel,
  createConversation: CreateConversationPanel,
  settings: SettingsPanel
};
