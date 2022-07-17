import ChatSidebar from 'components/ChatSidebar';
import WelcomeModal from 'components/WelcomeModal';
import { useAuthCtx } from 'contexts/AuthCtx';
import { ConversationsProvider } from 'contexts/ConversationsCtx';
import { SidebarProvider } from 'contexts/SidebarCtx';
import { withAuth } from 'utils/withAuth';
import { ChatComponent } from 'components/ChatComponent';

const Chat = () => {
  const { user } = useAuthCtx();
  const showWelcomeModal = !!user && !user.username;

  return (
    <ConversationsProvider>
      <SidebarProvider>
        <div className="flex w-full h-full">
          <ChatSidebar />
          <main id="chat-component" className="grow overscroll-contain flex flex-col h-full p-2">
            <ChatComponent />
          </main>
        </div>
        <WelcomeModal show={showWelcomeModal} />
      </SidebarProvider>
    </ConversationsProvider>
  );
};

export default Chat;

export const getServerSideProps = withAuth();
