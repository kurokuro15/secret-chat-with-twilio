import { ChatComponent } from 'components/ChatComponent';
import ChatSidebar from 'components/ChatSidebar';
import WelcomeModal from 'components/WelcomeModal';
import { ConversationsProvider, SidebarProvider } from 'contexts';
import { useAuth } from 'hooks';
import { withAuth } from 'utils/withAuth';

const Chat = () => {
  const { user } = useAuth();
  const showWelcomeModal = !!user && !user.username;

  return (
    <ConversationsProvider>
      <SidebarProvider>
        <div className="flex w-full h-full">
          <ChatSidebar />
          <ChatComponent />
        </div>
        <WelcomeModal show={showWelcomeModal} />
      </SidebarProvider>
    </ConversationsProvider>
  );
};

export default Chat;

export const getServerSideProps = withAuth();
