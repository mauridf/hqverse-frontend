import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallback?: React.ReactNode;
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallback,
  fallbackSrc = '/images/placeholder.jpg',
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        className={className}
        {...props}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}
