import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({ src, alt, fallbackTitle, className = '' }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1A171F] via-[#131118] to-[#0D0B10] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#FF7A1A]">
          <ImageOff className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="font-display text-sm font-semibold text-zinc-200">{fallbackTitle}</p>
        <p className="mt-1 text-xs text-zinc-500">Shivay Digital Visual Showcase</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
