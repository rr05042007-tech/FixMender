import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MechanicRequestsScreen from './src/features/mechanic/screens/MechanicRequestsScreen';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('FixMender runtime error:', error);
    console.error('FixMender component stack:', info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <ScrollView contentContainerStyle={styles.errorContainer}>
          <Text style={styles.errorTitle}>FixMender preview error</Text>
          <Text selectable style={styles.errorText}>
            {this.state.error.message}
          </Text>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <View style={styles.app}>
        <MechanicRequestsScreen />
      </View>
    </AppErrorBoundary>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1 },
  errorContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  errorTitle: {
    color: '#8B0000',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  errorText: {
    color: '#222222',
    fontSize: 14,
    lineHeight: 21,
  },
});
