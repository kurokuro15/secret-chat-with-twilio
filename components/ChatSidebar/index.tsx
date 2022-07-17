import { useSidebar } from 'hooks';
import { twMerge } from 'tailwind-merge';
import ConversationsPanel from './ConversationsPanel';
import CreateConversationPanel from './CreateConversationPanel';
import SettingsPanel from './SettingsPanel';

export default function ChatSidebar() {
  const { show, currentPanel } = useSidebar();

  const CurrentPanel = panels[currentPanel];

  return (
    <div
      className={twMerge(
        'w-full h-full lg:max-w-sm lg:border-r bg-white border-r-purple-400 absolute flex flex-col transition-all z-10',
        !show && '-translate-x-full',
        show && 'lg:static'
      )}
      role="navigation"
    >
      <CurrentPanel />
    </div>
  );
}

export const panels = {
  conversations: ConversationsPanel,
  createConversation: CreateConversationPanel,
  settings: SettingsPanel
};

export type Panel = keyof typeof panels;
