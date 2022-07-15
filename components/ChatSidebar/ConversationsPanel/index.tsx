import ConversationList from './ConversationList';
import Button from 'components/Button';
import { useConversationsCtx } from 'contexts/ConversationsCtx';
import { useAuthCtx } from 'contexts/AuthCtx';
import Spinner from 'components/Spinner';
import PanelHeader from '../PanelHeader';
import Avatar from 'components/Avatar';
import PlusIcon from 'components/icons/PlusIcon';
import { useSidebarCtx } from 'contexts/SidebarCtx';
import imgPlaceholder from 'public/photo.jpg';
import PanelContent from '../PanelContent';

export default function ConversationsPanel() {
  const { conversations, status } = useConversationsCtx();
  const { signOut } = useAuthCtx();
  const { changePanel } = useSidebarCtx();
  return (
    <>
      <PanelHeader className="flex justify-between items-center">
        <Button
          variant="transparent-primary"
          className="rounded-full p-0 hover:ring-4 hover:ring-purple-300 shadow-md"
        >
          <Avatar src={imgPlaceholder} className="w-9 h-9" />
        </Button>
        <div>
          <p className="font-bold">Conversaciones</p>
        </div>
        <Button
          variant="transparent-primary"
          className="rounded-full"
          onClick={() => changePanel('createConversation')}
        >
          <PlusIcon className="w-8 h-8" />
        </Button>
      </PanelHeader>

      <PanelContent className="p-0">
        {status.status === 'loading' && (
          <Spinner className="w-8 h-8 block mx-auto border-l-purple-500" />
        )}

        <ConversationList conversations={conversations} />
        <Button onClick={() => signOut()} className="mx-auto mt-3 block">
          Cerrar sesión
        </Button>
      </PanelContent>
    </>
  );
}
