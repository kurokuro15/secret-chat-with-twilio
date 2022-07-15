import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ConversationsHeader from './ConversationsHeader';
import ConversationsPanel from './ConversationsPanel';
import CreateConversationPanel from './CreateConversationPanel';

export default function ChatSidebar({ show }: { show: boolean }) {
  const [selectedPanel, setSelectedPanel] = useState<Panel>('conversations');

  const CurrentPanel = panels[selectedPanel];

  return (
    <div
      className={twMerge(
        'w-full h-full max-w-sm md:border-r bg-white border-r-purple-400 absolute flex flex-col transition-all z-10',
        !show && '-translate-x-full',
        show && 'md:static'
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
