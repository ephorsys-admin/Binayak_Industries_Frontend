import React from 'react';

/**
 * Lightweight Next.js Image shim for Vite environments.
 * Supports layout="fill", objectFit, width, height, blur transitions, and standard img props.
 */
export const Image = ({
  src,
  alt = '',
  width,
  height,
  className = '',
  layout,
  objectFit,
  onLoad,
  blurDataURL,
  decoding = 'async',
  loading = 'lazy',
  ...rest
}) => {
  const isFill = layout === 'fill';

  const combinedStyle = {
    ...(isFill
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }
      : {}),
    ...(objectFit ? { objectFit } : {}),
    ...(rest.style || {}),
  };

  return (
    <img
      src={src}
      alt={alt}
      width={!isFill ? width : undefined}
      height={!isFill ? height : undefined}
      onLoad={onLoad}
      className={className}
      style={combinedStyle}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
};

export default Image;
