import Image, { StaticImageData } from 'next/image';
import { twMerge } from 'tailwind-merge';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | StaticImageData;
  alt?: string;
  size?: number;
}

function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <div className={twMerge('h-12 w-12 rounded-full overflow-hidden relative', className)}>
      <Image className="object-cover" src={src} alt={alt} layout="fill" />
    </div>
  );
}

export default Avatar;