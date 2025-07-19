import { useCallback, type CSSProperties, type ReactElement, type ReactNode } from 'react';
import { Button, type ButtonProps, type ButtonRenderProps } from 'react-aria-components';
import * as stylex from '@stylexjs/stylex';
import { toClass, toCssProperties } from '../helpers/styles';

interface PrimaryButtonProps extends Omit<ButtonProps, 'style' | 'className' | 'children'> {
  readonly label: ReactNode;
  readonly xstyle?: stylex.StyleXStyles;
}

const rootStyles = stylex.create({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
  },
});

export function PrimaryButton({ label, xstyle, ...props }: PrimaryButtonProps): ReactElement {
  const ariax = useCallback(() => {
    return stylex.props(
      rootStyles.base,
      xstyle,
    );
  }, [xstyle]);

  const handleClassName = useCallback((args: ButtonRenderProps & { defaultClassName: string | undefined }) => {
    return toClass(args.defaultClassName, ariax().className);
  }, [ariax]);

  const handleStyle = useCallback((args: ButtonRenderProps & { defaultStyle: CSSProperties | undefined }) => {
    return toCssProperties(args.defaultStyle, ariax().style);
  }, [ariax]);

  return (
    <Button
      style={handleStyle}
      className={handleClassName}
      {...props}
    >
      {label}
    </Button>
  );
}
