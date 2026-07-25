import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-100 p-8 text-center">
          <div className="bg-error/10 p-4 rounded-full mb-4">
            <AlertCircle className="h-12 w-12 text-error" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Algo deu errado</h2>
          <p className="text-muted-foreground mb-2 max-w-md">
            Ocorreu um erro ao carregar esta página.
          </p>
          {this.state.error && process.env.NODE_ENV === 'development' && (
            <p className="text-sm text-muted-foreground mb-4 max-w-md font-mono bg-muted p-2 rounded">
              {this.state.error.message}
            </p>
          )}
          <Button onClick={this.handleReset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Tentar novamente
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
