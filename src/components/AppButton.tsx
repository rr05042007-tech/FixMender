import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";

import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import Typography from "../constants/typrography";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function AppButton({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  const buttonStyle = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : styles.autoWidth,
    isDisabled && styles.disabled,
    style,
  ];

  const labelStyle = [
    styles.text,
    variant === "outline" && styles.outlineText,
    variant === "secondary" && styles.secondaryText,
    isDisabled && variant === "outline" && styles.disabledOutlineText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{
        disabled: isDisabled,
        busy: loading,
      }}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? Colors.primary : Colors.white}
          size="small"
        />
      ) : (
        <Text style={labelStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: Spacing.buttonHeight,
    paddingVertical: Spacing.buttonPaddingVertical,
    paddingHorizontal: Spacing.buttonPaddingHorizontal,
    borderRadius: Spacing.radiusMedium,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  fullWidth: {
    width: "100%",
  },

  autoWidth: {
    alignSelf: "flex-start",
  },

  primary: {
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.primary,
  },

  secondary: {
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1,
    borderColor: Colors.backgroundLight,
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },

  danger: {
    backgroundColor: Colors.error,
    borderWidth: 1,
    borderColor: Colors.error,
  },

  disabled: {
    opacity: 0.55,
  },

  text: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.white,
    textAlign: "center",
  },

  secondaryText: {
    color: Colors.primary,
  },

  outlineText: {
    color: Colors.primary,
  },

  disabledOutlineText: {
    color: Colors.textSecondary,
  },
});