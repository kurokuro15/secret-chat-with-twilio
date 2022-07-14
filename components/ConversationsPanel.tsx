import ConversationList from './ConversationList';
import Button from './Button';
import { useConversationsCtx } from 'contexts/ConversationsCtx';
import { useAuthCtx } from 'contexts/AuthCtx';

export default function ConversationsPanel() {
  const { conversations } = useConversationsCtx();
  const { signOut } = useAuthCtx();
  return (
    <>
      <ConversationList conversations={conversations} />
      <Button onClick={() => signOut()} className="mx-auto mt-3 block">
        Cerrar sesión
      </Button>
    </>
  );
}
