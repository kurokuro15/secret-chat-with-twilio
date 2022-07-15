import { useSidebarCtx } from 'contexts/SidebarCtx';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ConversationsHeader from './ConversationsHeader';
import ConversationsPanel from './ConversationsPanel';
import CreateConversationPanel from './CreateConversationPanel';

export default function ChatSidebar() {
  const [selectedPanel, setSelectedPanel] = useState<Panel>('conversations');

  const { show } = useSidebarCtx();

  const CurrentPanel = panels[selectedPanel];

  return (
    <div
      className={twMerge(
        'w-full h-full lg:max-w-sm lg:border-r bg-white border-r-purple-400 absolute flex flex-col transition-all z-10',
        !show && '-translate-x-full',
        show && 'lg:static'
      )}
    >
      <ConversationsHeader selectPanel={setSelectedPanel} selectedPanel={selectedPanel} />
      <div className="max-h-full overflow-auto p-3">
        <CurrentPanel selectPanel={(panel: Panel) => setSelectedPanel(panel)} />
      </div>
    </div>
  );
}

export type Panel = keyof typeof panels;

const panels = {
  conversations: ConversationsPanel,
  createConversation: CreateConversationPanel
};
