
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import Typography from "../constants/typrography";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
}

export default function AppInput({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  isPassword = false,
  containerStyle,
  secureTextEntry,
  multiline = false,
  editable = true,
  ...textInputProps
}: AppInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const shouldHideText =
    isPassword && !passwordVisible
      ? true
      : secureTextEntry;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <Text style={styles.label}>
          {label}
          {textInputProps.required ? (
            <Text style={styles.required}> *</Text>
          ) : null}
        </Text>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          multiline && styles.multilineContainer,
          error && styles.inputError,
          !editable && styles.disabled,
        ]}
      >
        {leftIcon ? (
          <Ionicons
            name={leftIcon}
            size={Spacing.iconSize}
            color={Colors.textSecondary}
            style={styles.leftIcon}
          />
        ) : null}

        <TextInput
          {...textInputProps}
          editable={editable}
          multiline={multiline}
          secureTextEntry={shouldHideText}
          placeholderTextColor={Colors.placeholder}
          style={[
            styles.input,
            multiline && styles.multilineInput,
          ]}
          accessibilityLabel={label || textInputProps.placeholder}
          accessibilityState={{ disabled: !editable }}
        />

        {isPassword ? (
          <TouchableOpacity
            onPress={() => setPasswordVisible((visible) => !visible)}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel={
              passwordVisible ? "Hide password" : "Show password"
            }
          >
            <Ionicons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={Spacing.iconSize}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Input action"
          >
            <Ionicons
              name={rightIcon}
              size={Spacing.iconSize}
              color={Colors.textSecondary}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.errorText} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: Spacing.md,
  },

  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  required: {
    color: Colors.error,
  },

  inputContainer: {
    minHeight: Spacing.inputHeight,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.radiusMedium,
    paddingHorizontal: Spacing.inputPaddingHorizontal,
  },

  multilineContainer: {
    minHeight: 110,
    alignItems: "flex-start",
    paddingVertical: Spacing.sm,
  },

  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: Spacing.inputPaddingVertical,
    fontSize: Typography.fontSize.md,
    color: Colors.text,
  },

  multilineInput: {
    minHeight: 90,
    textAlignVertical: "top",
    paddingTop: Spacing.sm,
  },

  leftIcon: {
    marginRight: Spacing.sm,
  },

  iconButton: {
    padding: Spacing.xs,
    justifyContent: "center",
    alignItems: "center",
  },

  inputError: {
    borderColor: Colors.error,
  },

  errorText: {
    color: Colors.error,
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
  },

  disabled: {
    opacity: 0.55,
  },
});
