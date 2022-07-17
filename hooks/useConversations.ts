import { ConversationsCtx } from 'contexts';
import { useContext } from 'react';

function useConversations() {
  const context = useContext(ConversationsCtx);
  if (context === undefined)
    throw new Error('useConversations must be used inside a ConversationsProvider');
  return context;
}

export default useConversations;
