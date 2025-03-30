import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children?: ReactNode; fallback?: ReactNode; assign?: URL; replace?: URL }, { error?: Error; errorInfo?: ErrorInfo }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);

    this.state = { error: undefined, errorInfo: undefined };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });

    window.dispatchEvent(new ErrorEvent('error', { error }));

    if (this.props.assign !== undefined && this.props.assign.toString() !== location.toString()) {
      location.assign(this.props.assign);
    }

    if (this.props.replace !== undefined && this.props.replace.toString() !== location.toString()) {
      location.replace(this.props.replace);
    }
  }

  override render(): ReactNode {
    if (this.state.error !== undefined) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
