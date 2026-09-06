import { useEffect, useState } from 'react';
import { fetchImageForQuery } from '../../services/imageService';

interface RemoteImageProps {
  query: string;
  fallback: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export function RemoteImage({ query, fallback, alt, className = '', imgClassName = '' }: RemoteImageProps) {
  const [src, setSrc] = useState(fallback);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoaded(false);
    setSrc(fallback);

    fetchImageForQuery(query, fallback).then((url) => {
      if (!cancelled) setSrc(url);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, fallback]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && <div className="absolute inset-0 shimmer-bg" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
          setLoaded(true);
        }}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
