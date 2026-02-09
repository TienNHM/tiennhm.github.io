import React from 'react';

export interface ColorSwatchProps {
  hex: string;
  size?: string;
}

export function ColorSwatch({ hex, size = '0.9em' }: ColorSwatchProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        background: hex,
        borderRadius: 2,
        border: '1px solid #ccc',
        marginLeft: 4,
        verticalAlign: 'middle',
      }}
      aria-hidden="true"
    />
  );
}

