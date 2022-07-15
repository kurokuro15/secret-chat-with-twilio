import { useState } from 'react';
import ConversationsHeader from './ConversationsHeader';
import ConversationsPanel from './ConversationsPanel';
import CreateConversationPanel from './CreateConversationPanel';

export default function ChatSidebar() {
  const [selectedPanel, setSelectedPanel] = useState<Panel>('conversations');

  const CurrentPanel = panels[selectedPanel];

  return (
    <div className="w-full max-w-sm border-r border-r-purple-400 flex flex-col absolute md:static">
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
