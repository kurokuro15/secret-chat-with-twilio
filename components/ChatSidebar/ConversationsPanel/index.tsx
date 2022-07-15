import ConversationList from './ConversationList';
import Button from '../../Button';
import { useConversationsCtx } from 'contexts/ConversationsCtx';
import { useAuthCtx } from 'contexts/AuthCtx';
import Spinner from '../../Spinner';

export default function ConversationsPanel() {
  const { conversations, status } = useConversationsCtx();
  const { signOut } = useAuthCtx();
  return (
    <>
      {status.status === 'loading' && (
        <Spinner className="w-8 h-8 block mx-auto border-l-purple-500" />
      )}
      <ConversationList conversations={conversations} />
      <Button onClick={() => signOut()} className="mx-auto mt-3 block">
        Cerrar sesión
      </Button>
    </>
  );
}
