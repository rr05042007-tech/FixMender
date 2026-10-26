
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { loginUser } from "../../../../components/services/auth.services";
import Colors from "../../../constants/colors";
import Spacing from "../../../constants/spacing";
import Typography from "../../../constants/typrography";
import AppInput from "../../../components/AppInput";
import AppButton from "../../../components/AppButton";
import { validateLogin } from "../validation";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
const handleLogin = async () => {
  setError("");

  const validationError = validateLogin(email, password);

  if (validationError) {
    setError(validationError);
    return;
  }

  try {
    setLoading(true);

    const response = await loginUser({
      email: email.trim(),
      password,
    });

    // Check that the backend returned an authentication token.
    const token = response.token ?? response.accessToken;

    if (!token) {
      setError(
        response.message ||
          "Login response did not contain an authentication token."
      );
      return;
    }

    // TODO: Securely save the token and initialize the user session.
    router.replace("/(tabs)/home" as never);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Login failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons
                name="construct"
                size={42}
                color={Colors.white}
              />
            </View>

            <Text style={styles.appName}>FixMender</Text>
            <Text style={styles.tagline}>
              Vehicle care, wherever you are.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>
              Sign in to find trusted mechanics near you.
            </Text>

            <AppInput
              label="Email Address"
              placeholder="Enter your email"
              leftIcon="mail-outline"
              inputType="email-address"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setError("");
              }}
            />

            <AppInput
              label="Password"
              placeholder="Enter your password"
              leftIcon="lock-closed-outline"
              isPassword
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError("");
              }}
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() =>
                router.push("/(auth)/verify-otp" as never)
              }
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {error ? (
              <View style={styles.errorContainer}>
                <Ionicons
                  name="alert-circle-outline"
                  size={18}
                  color={Colors.error}
                />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <AppButton
              title="Login"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              style={styles.loginButton}
            />

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>
                Don't have an account?{" "}
              </Text>

              <TouchableOpacity
                onPress={() => router.push("/(auth)/signup" as never)}
              >
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.securityNote}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={Colors.success}
              />
              <Text style={styles.securityText}>
                Your account and vehicle details stay protected.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.xxxl,
  },

  header: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 48,
    paddingBottom: 42,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },

  logoContainer: {
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: Colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },

  appName: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.extraBold,
    color: Colors.white,
  },

  tagline: {
    marginTop: Spacing.sm,
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    opacity: 0.9,
  },

  form: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: 32,
  },

  title: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },

  subtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },

  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },

  forgotText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },

  errorText: {
    flex: 1,
    color: Colors.error,
    fontSize: Typography.fontSize.sm,
  },

  loginButton: {
    marginTop: Spacing.sm,
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: Spacing.xl,
  },

  signupText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },

  signupLink: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },

  securityNote: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: 32,
  },

  securityText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    textAlign: "center",
  },
});
