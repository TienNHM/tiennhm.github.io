import React from 'react';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

// Default implementation, that you can customize
export default function Root({children}) {
  const value = {
      appendTo: 'self',
      ripple: true,
      local: 'vi'
  };

  return (
    <PrimeReactProvider value={value}>
        {children}
    </PrimeReactProvider>
  );
}