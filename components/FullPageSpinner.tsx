import Spinner from './ui/Spinner';

export default function FullPageSpinner() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner className="w-10 h-10" />
    </div>
  );
}
