import classNames from 'classnames';
import Image, { StaticImageData } from 'next/image';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string | StaticImageData;
  alt?: string;
  size?: number;
}

function Avatar({ src, alt, className, size = 12 }: AvatarProps) {
  return (
    <div
      className={classNames(
        `h-${size} w-${size}`,
        'rounded-full overflow-hidden relative',
        className
      )}
    >
      <Image className="object-cover" src={src} alt={alt} layout="fill" />
    </div>
  );
}

export default Avatar;
