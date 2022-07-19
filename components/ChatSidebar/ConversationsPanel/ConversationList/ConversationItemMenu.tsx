import { Conversation } from '@twilio/conversations';
import { TrashIcon, LogoutIcon } from 'components/icons';
import Button from 'components/ui/Button';
import { useAuth, useConversations, useNotifications } from 'hooks';
import React from 'react';
export function ConversationItemMenu({ conversation }: { conversation: Conversation }) {
  const { user } = useAuth();
  const { selectConversation, selectedConversation } = useConversations();
  const { addNotification } = useNotifications();

  return (
    <div className="bg-white w-max p-3 rounded-md shadow-sm border border-gray-300 relative">
      <div className="w-3 h-3 rotate-45 absolute bg-white border-l border-t border-gray-300 top-0 -translate-y-1/2 left-1/2 -translate-x-1/2" />
      <div className="flex flex-col gap-2">
        {conversation.createdBy === user?.username && (
          <>
            <Button
              variant="transparent-danger"
              className="px-3 items-center justify-between flex gap-4 grow"
              onClick={async () => {
                const continueDelete = confirm('¿Está seguro de que desea eliminar este chat?');

                if (continueDelete) {
                  try {
                    await conversation.delete();

                    if (conversation === selectedConversation) {
                      selectConversation();
                    }
                  } catch (error) {
                    if (error instanceof Error)
                      addNotification({
                        message: error.message
                      });
                  }
                }
              }}
            >
              <span>Eliminar chat</span>
              <TrashIcon />
            </Button>
          </>
        )}
        <Button
          variant="transparent-danger"
          className="px-3 items-center justify-between flex gap-4 grow"
          onClick={async () => {
            const continueDelete = confirm('¿Está seguro de que desea abandonar este chat?');

            if (continueDelete) {
              try {
                await conversation.leave();

                if (conversation === selectedConversation) {
                  selectConversation();
                }
              } catch (error) {
                if (error instanceof Error)
                  addNotification({
                    message: error.message
                  });
              }
            }
          }}
        >
          <span>Abandonar chat</span>
          <LogoutIcon />
        </Button>
      </div>
    </div>
  );
}
