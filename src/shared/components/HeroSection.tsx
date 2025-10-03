import Image from 'next/image';
import { Label } from './Label';

export interface HeroSectionProps {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  logoClassName?: string;
}

export function HeroSection({
  logo,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  logoClassName,
}: HeroSectionProps) {
  return (
    <div className={className}>
      <div className="mb-8 flex justify-center">
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          className={`h-16 ${logoClassName || ''}`}
          priority={true}
        />
      </div>
      <Label
        as="h1"
        variant="h1"
        className={`mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 ${titleClassName || ''}`}
      >
        {title}
      </Label>
      <Label
        className={`text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto ${descriptionClassName || ''}`}
      >
        {description}
      </Label>
    </div>
  );
}
