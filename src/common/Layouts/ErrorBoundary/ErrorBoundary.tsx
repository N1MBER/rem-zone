import React from 'react';
import { Responses500 } from '@consta/uikit/Responses500';
import './ErrorBoundary.scss';
import { cn } from '../../../__private__/utils/bem';
import { Flex } from '../Flex/Flex';

type ErrorBoundaryProps = {
  className?: string;
  children?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

const cnErrorBoundary = cn('ErrorBoundary');

// Здесь необходимо использовать классовый компонент, т.к. в реакт нет реализации error boundary с помощью хуков
export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={cnErrorBoundary({}, [this.props.className])}>
          <Flex alignItems="center" justifyContent="center">
            <Responses500 />
          </Flex>
        </div>
      );
    }
    return this.props.children;
  }
}
