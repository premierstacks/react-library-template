import { Component, type ErrorInfo, type ReactElement } from 'react';

export class ErrorBoundary extends Component<{ children?: ReactElement; fallback?: ReactElement; assign?: URL; replace?: URL }, { error?: Error; errorInfo?: ErrorInfo }> {
  public constructor(props: { children: ReactElement; fallback: ReactElement }) {
    super(props);

    this.state = { error: undefined, errorInfo: undefined };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });

    window.dispatchEvent(new ErrorEvent('error', { error }));

    if (this.props.assign !== undefined && this.props.assign.toString() !== location.toString()) {
      location.assign(this.props.assign);
    }

    if (this.props.replace !== undefined && this.props.replace.toString() !== location.toString()) {
      location.replace(this.props.replace);
    }
  }

  public override render(): ReactElement | undefined {
    if (this.state.error !== undefined) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
