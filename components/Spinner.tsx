export default function Spinner({ size = 4 }: { size?: number }) {
  return (
    <div
      className={`spinner animate-spin border-4 border-black/20 w-${size} h-${size} rounded-full border-l-inherit inline-block`}
    ></div>
  );
}
