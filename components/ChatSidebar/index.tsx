import { panels, useSidebarCtx } from 'contexts/SidebarCtx';
import { twMerge } from 'tailwind-merge';

export default function ChatSidebar() {
  const { show, currentPanel } = useSidebarCtx();

  const CurrentPanel = panels[currentPanel];

  return (
    <div
      className={twMerge(
        'w-full h-full lg:max-w-sm lg:border-r bg-white border-r-purple-400 absolute flex flex-col transition-all z-10',
        !show && '-translate-x-full',
        show && 'lg:static'
      )}
    >
      <CurrentPanel />
    </div>
  );
}
