import { BackIcon } from 'components/icons';
import Button from 'components/ui/Button';
import { UserAvatarUpload } from 'components/UserAvatarUpload';
import { useAuthCtx, useSidebarCtx } from 'contexts';
import PanelContent from '../PanelContent';
import PanelHeader from '../PanelHeader';

export default function SettingsPanel() {
  const { changePanel } = useSidebarCtx();
  const { signOut, user } = useAuthCtx();

  return (
    <>
      <PanelHeader className="flex gap-5 items-center">
        <Button
          variant="transparent-primary"
          className="rounded-full"
          onClick={() => changePanel('conversations')}
        >
          <BackIcon />
        </Button>
        <h2 className="font-bold">Ajustes</h2>
      </PanelHeader>

      <PanelContent>
        <div className="flex gap-5 items-center">
          <UserAvatarUpload />
          <div className="grow">
            <p className="font-bold">{user?.username}</p>
            <p>{user?.email}</p>
          </div>
        </div>

        <Button onClick={() => signOut()} className="mx-auto mt-3 block">
          Cerrar sesión
        </Button>
      </PanelContent>
    </>
  );
}
