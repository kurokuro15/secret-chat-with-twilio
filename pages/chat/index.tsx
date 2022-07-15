import ChatContainer from 'components/ChatConteiner';
import ChatHeader from 'components/ChatHeader';
import ChatInput from 'components/ChatInput';
import ChatMessageContainer from 'components/ChatMessangeContainer';
import ChatSidebar from 'components/ChatSidebar';
import { ConversationsProvider } from 'contexts/ConversationsCtx';
import { NextPage } from 'next';
import { useState } from 'react';
import { withAuth } from 'utils/withAuth';

const Chat: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  function toggleSidebar() {
    setShowSidebar((prev) => !prev);
  }
  return (
    <ConversationsProvider>
      <div className="flex w-full h-full">
        {showSidebar && <ChatSidebar />}
        <main id="chat-component" className="grow overscroll-contain flex flex-col h-full p-2">
          <ChatHeader toggleSidebar={toggleSidebar} />
          <ChatContainer>
            <ChatMessageContainer
              message="Soy un mensaje to' guapo. Pero si hago mucho texto me desformo ? o no, todo irá
              bien. Vamos a ver si creo más texto y esto tendría que tener muchas líneas sin
              importar el texto ni el tamaño de la pantalla.!"
              id={2}
              date={{ title: 'today', time: '12:00' }}
            />
            <ChatMessageContainer
              message="Hola soy Juan"
              id={1}
              date={{ title: 'today', time: '12:00' }}
            />
            <ChatMessageContainer
              message="Y yo soy pedro"
              id={2}
              date={{ title: 'today', time: '12:00' }}
            />
            <ChatMessageContainer
              message="Soy un mensaje to' guapo. Pero si hago mucho texto me desformo ? o no, todo irá
              bien. Vamos a ver si creo más texto y esto tendría que tener muchas líneas sin
              importar el texto ni el tamaño de la pantalla.!"
              date={{ title: 'today', time: '12:00' }}
              id={1}
            />
            <ChatMessageContainer
              message="Soy un mensaje to' guapo. Pero si hago mucho texto me desformo ? o no, todo irá
              bien. Vamos a ver si creo más texto y esto tendría que tener muchas líneas sin
              importar el texto ni el tamaño de la pantalla.!"
              id={2}
              date={{ title: 'today', time: '12:00' }}
            />
            <ChatMessageContainer
              message="Hola soy Juan"
              id={1}
              date={{ title: 'today', time: '12:00' }}
            />
            <ChatMessageContainer
              message="Y yo soy pedro"
              id={2}
              date={{ title: 'today', time: '12:00' }}
            />
            <ChatMessageContainer
              message="Soy un mensaje to' guapo. Pero si hago mucho texto me desformo ? o no, todo irá
              bien. Vamos a ver si creo más texto y esto tendría que tener muchas líneas sin
              importar el texto ni el tamaño de la pantalla.!"
              date={{ title: 'today', time: '12:00' }}
              id={1}
            />
            <ChatMessageContainer
              message="Soy un mensaje to' guapo. Pero si hago mucho texto me desformo ? o no, todo irá
              bien. Vamos a ver si creo más texto y esto tendría que tener muchas líneas sin
              importar el texto ni el tamaño de la pantalla.!"
              id={2}
              date={{ title: 'today', time: '12:00' }}
            />
            <ChatMessageContainer
              message="Hola soy Juan"
              id={1}
              date={{ title: 'today', time: '12:00' }}
            />
            <ChatMessageContainer
              message="Y yo soy pedro"
              id={2}
              date={{ title: 'today', time: '12:00' }}
            />
            <ChatMessageContainer
              message="Soy un mensaje to' guapo. Pero si hago mucho texto me desformo ? o no, todo irá
              bien. Vamos a ver si creo más texto y esto tendría que tener muchas líneas sin
              importar el texto ni el tamaño de la pantalla.!"
              date={{ title: 'today', time: '12:00' }}
              id={1}
            />
          </ChatContainer>
          <div className="grow-0 inset-x-0 bottom-0 justify-center">
            <ChatInput />
          </div>
        </main>
      </div>
    </ConversationsProvider>
  );
};

export default Chat;

export const getServerSideProps = withAuth();
