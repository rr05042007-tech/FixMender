
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from "react-native";

import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import Typography from "../constants/typrography";

interface LoadingViewProps {
  message?: string;
  fullScreen?: boolean;
  color?: string;
  style?: ViewStyle;
}

export default function LoadingView({
  message = "Please wait...",
  fullScreen = false,
  color = Colors.primary,
  style,
}: LoadingViewProps) {
  return (
    <View
      style={[
        styles.container,
        fullScreen && styles.fullScreen,
        style,
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel={message}
    >
      <ActivityIndicator
        size="large"
        color={color}
      />

      {message ? (
        <Text style={styles.message}>
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 120,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },

  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },

  message: {
    marginTop: Spacing.lg,
    fontSize: Typography.fontSize.md,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
