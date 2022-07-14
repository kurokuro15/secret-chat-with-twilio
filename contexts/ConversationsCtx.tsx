import useConversations from 'hooks/useConversations';
import { ReactNode, createContext, useContext } from 'react';

const ConversationsCtx = createContext<ReturnType<typeof useConversations> | undefined>(undefined);

function ConversationsProvider({ children }: { children: ReactNode }) {
  const conversationsUtils = useConversations();
  return (
    <ConversationsCtx.Provider value={conversationsUtils}>{children}</ConversationsCtx.Provider>
  );
}

function useConversationsCtx() {
  const context = useContext(ConversationsCtx);
  if (context === undefined)
    throw new Error('useConversationsCtx must be used inside a ConversationsProvider');
  return context;
}

export { ConversationsProvider, useConversationsCtx };
