import { PlusIcon } from 'components/icons';
import Avatar from 'components/ui/Avatar';
import Button from 'components/ui/Button';
import Spinner from 'components/ui/Spinner';
import { useAuth, useConversations, useSidebar } from 'hooks';
import imgPlaceholder from 'public/avatar.png';
import PanelContent from '../PanelContent';
import PanelHeader from '../PanelHeader';
import ConversationList from './ConversationList';

export default function ConversationsPanel() {
  const { conversations, status } = useConversations();
  const { user } = useAuth();
  const { changePanel } = useSidebar();

  return (
    <>
      <PanelHeader className="flex justify-between items-center">
        <Button
          variant="transparent-primary"
          className="rounded-full p-0 hover:scale-105 shadow-md"
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
          <Spinner className="w-8 h-8 block mx-auto mt-3 border-l-purple-500" />
        )}

        <ConversationList conversations={conversations} />
      </PanelContent>
    </>
  );
}
