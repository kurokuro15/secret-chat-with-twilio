import { AuthCtx } from 'contexts';
import { useContext } from 'react';

function useAuth() {
  const context = useContext(AuthCtx);
  if (context === undefined) {
    throw new Error('useAuthCtx must be used inside a AuthProvider');
  }
  return context;
}

export default useAuth;
