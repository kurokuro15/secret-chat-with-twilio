import ChatSidebar from 'components/ChatSidebar';
import { ConversationsProvider } from 'contexts/ConversationsCtx';
import { NextPage } from 'next';
import Image from 'next/image';
import { withAuth } from 'utils/withAuth';
import SendIcon from '../../components/icons/SendIcon';
import perfilTemp from '../../public/photo.jpg';

const Chat: NextPage = () => {
  return (
    <ConversationsProvider>
      <div className="flex w-full h-full">
        <ChatSidebar />

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
    </ConversationsProvider>
  );
};

export default Chat;

export const getServerSideProps = withAuth();
