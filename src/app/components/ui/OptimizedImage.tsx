import Image, { ImageProps } from 'next/image';

// A simple wrapper to enforce best practices and allow easy refactoring
export default function OptimizedImage(props: ImageProps) {
  return <Image {...props} loading="lazy" />;
}
