import { NextPage } from 'next';
import SendIcon from '../../components/icons/SendIcon';
import Image from 'next/image';
import perfilTemp from '../../public/photo.jpg';
import ConversationList from 'components/ConversationList';
import useConversations from 'hooks/useConversations';
import ConversationsHeader from 'components/ConversationsHeader';
import { withAuth } from 'utils/withAuth';
import Button from 'components/Button';
import { useAuthCtx } from 'contexts/AuthCtx';

const Chat: NextPage = () => {
  const { conversations } = useConversations();
  const { signOut } = useAuthCtx();
  return (
    <div className="flex w-full h-full">
      <div className="w-full max-w-sm border-r border-r-purple-400">
        <ConversationsHeader />
        <ConversationList conversations={conversations} />
        <Button onClick={() => signOut()} className="mx-auto mt-3 block">
          Cerrar sesión
        </Button>
      </div>

      <main id="chat-component" className="grow overscroll-contain flex flex-col h-full p-2">
        <div id="chat-header" className="flex items-center justify-between">
          <div id="chat-header-title" className="p-0 m-0">
            <h1 id="chat" className="p-0 m-0 text-2xl font-bold">
              Reynaldo González
            </h1>
            <small id="status" className="p-0 m-0 text-sm">
              Online
            </small>
          </div>
          <div className="chat-image p-0 m-0 h-16 rounded-full border aspect-square overflow-hidden flex drop-shadow-md">
            <Image className="object-cover" src={perfilTemp} alt="profile" />
          </div>
        </div>

        <div className="grow chat-content"></div>

        <div className="grow-0 inset-x-0 bottom-0 justify-center">
          <form className="flex container p-0 m-0 gap-x-3">
            <div className="p-0 m-0 overflow-hidden flex-1">
              <input
                className="w-full m-0 border pl-2 pb-1.5 pt-1"
                type="text"
                placeholder="Type a message..."
              />
            </div>
            <div className="p-0 m-0 h-9 rounded-full border aspect-square overflow-hidden flex flex-none align-content justify-center hover:bg-slate-400">
              <button className="w-full" type="submit" aria-label="send">
                <SendIcon className="w-full h-6" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chat;

export const getServerSideProps = withAuth();
