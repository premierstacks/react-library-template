import type { ReactElement, ReactNode } from 'react';
import { Button, type ButtonProps } from 'react-aria-components';

interface ButtonComponentProps extends ButtonProps {
  readonly label: ReactNode;
}

export function ButtonComponent({ label, ...props }: ButtonComponentProps): ReactElement {
  return (
    <Button
      {...props}
    >
      {label}
    </Button>
  );
}
