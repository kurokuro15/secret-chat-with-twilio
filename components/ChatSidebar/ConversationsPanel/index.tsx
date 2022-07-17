import Avatar from 'components/Avatar';
import Button from 'components/Button';
import PlusIcon from 'components/icons/PlusIcon';
import Spinner from 'components/Spinner';
import { useAuthCtx } from 'contexts/AuthCtx';
import { useConversationsCtx } from 'contexts/ConversationsCtx';
import { useSidebarCtx } from 'contexts/SidebarCtx';
import imgPlaceholder from 'public/photo.jpg';
import PanelContent from '../PanelContent';
import PanelHeader from '../PanelHeader';
import ConversationList from './ConversationList';

export default function ConversationsPanel() {
  const { conversations, status } = useConversationsCtx();
  const { user } = useAuthCtx();
  const { changePanel } = useSidebarCtx();

  return (
    <>
      <PanelHeader className="flex justify-between items-center">
        <Button
          variant="transparent-primary"
          className="rounded-full p-0 hover:ring-4 hover:ring-purple-300 shadow-md"
          onClick={() => changePanel('settings')}
          aria-label="Ajustes"
        >
          <Avatar src={user?.avatar_url ?? imgPlaceholder} className="w-9 h-9" />
        </Button>
        <div>
          <h1 className="font-bold">Conversaciones</h1>
        </div>
        <Button
          variant="transparent-primary"
          className="rounded-full"
          onClick={() => changePanel('createConversation')}
          aria-label="Crear conversación"
        >
          <PlusIcon className="w-8 h-8" />
        </Button>
      </PanelHeader>

      <PanelContent className="p-0">
        {status.status === 'loading' && (
          <Spinner className="w-8 h-8 block mx-auto border-l-purple-500" />
        )}

        <ConversationList conversations={conversations} />
      </PanelContent>
    </>
  );
}