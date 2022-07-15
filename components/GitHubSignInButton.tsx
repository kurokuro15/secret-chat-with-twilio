import Button from 'components/Button';
import { useAuthCtx } from 'contexts/AuthCtx';
import GitHubLogo from './icons/GitHubLogo';

export default function GithubSignInButton() {
  const { signInWithGithub } = useAuthCtx();
  return (
    <Button
      className="flex items-center gap-2 justify-center w-full mb-2"
      variant="black"
      onClick={signInWithGithub}
    >
      <GitHubLogo /> Registrarse con GitHub
    </Button>
  );
}
