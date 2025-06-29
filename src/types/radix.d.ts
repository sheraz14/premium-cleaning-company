declare module '@radix-ui/react-slot' {
  import * as React from 'react';
  
  type SlotProps = {
    children?: React.ReactNode;
  } & React.HTMLAttributes<HTMLElement>;
  
  export const Slot: React.ForwardRefExoticComponent<
    SlotProps & React.RefAttributes<HTMLElement>
  >;
} 