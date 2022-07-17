import Button from 'components/ui/Button';
import { useAuthCtx } from 'contexts';
import { GitHubLogo } from 'components/icons';

export default function GithubSignInButton() {
  const { signInWithGithub } = useAuthCtx();
  return (
    <Button
      className="flex items-center gap-2 justify-center w-full mb-2"
      variant="black"
      onClick={signInWithGithub}
    >
      <GitHubLogo /> Iniciar sesión con GitHub
    </Button>
  );
}
