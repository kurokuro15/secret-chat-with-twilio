import useAuth from 'hooks/useAuth';
import React, { ReactNode, useContext } from 'react';

const AuthCtx = React.createContext<ReturnType<typeof useAuth> | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const authUtils = useAuth();
  return <AuthCtx.Provider value={authUtils}>{children}</AuthCtx.Provider>;
}

function useAuthCtx() {
  const context = useContext(AuthCtx);
  if (context === undefined) {
    throw new Error('useAuthCtx must be used inside a AuthProvider');
  }
  return context;
}

export { AuthCtx, AuthProvider, useAuthCtx };
