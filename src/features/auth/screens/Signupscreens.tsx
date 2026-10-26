
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import Colors from "../../../../components/constants/colors";
import Spacing from "../../../../components/constants/spacing";
import Typography from "../../../../components/constants/typography";
import AppInput from "../../../components/AppInput";
import AppButton from "../../../components/AppButton";
import { isValidEmail, isValidPassword } from "../validation";
import { signupUser } from "../../../../components/services/auth.services";

export default function SignupScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (phone.replace(/\D/g, "").length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await signupUser({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        password,
      });

      Alert.alert(
        "Account created",
        "Your registration was successful.",
        [
          {
            text: "Continue",
            onPress: () =>
              router.replace({
                pathname: "/(auth)/verify-otp",
                params: { email: email.trim().toLowerCase() },
              } as never),
          },
        ]
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account. Please try again."
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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logo}>
              <Ionicons
                name="construct"
                size={36}
                color={Colors.white}
              />
            </View>

            <Text style={styles.appName}>FixMender</Text>
            <Text style={styles.tagline}>
              Your journey to hassle-free vehicle care.
            </Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Join FixMender and find trusted mechanics nearby.
            </Text>

            <AppInput
              label="Full Name"
              placeholder="Enter your full name"
              leftIcon="person-outline"
              value={name}
              onChangeText={(value) => {
                setName(value);
                setError("");
              }}
              autoCapitalize="words"
            />

            <AppInput
              label="Email Address"
              placeholder="Enter your email"
              leftIcon="mail-outline"
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setError("");
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <AppInput
              label="Phone Number"
              placeholder="10-digit mobile number"
              leftIcon="call-outline"
              value={phone}
              onChangeText={(value) => {
                setPhone(value.replace(/\D/g, "").slice(0, 10));
                setError("");
              }}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <AppInput
              label="Password"
              placeholder="Create a password"
              leftIcon="lock-closed-outline"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setError("");
              }}
              isPassword
            />

            <AppInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              leftIcon="shield-checkmark-outline"
              value={confirmPassword}
              onChangeText={(value) => {
                setConfirmPassword(value);
                setError("");
              }}
              isPassword
            />

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
              title="Create Account"
              onPress={handleSignup}
              loading={loading}
              disabled={loading}
              fullWidth
              style={styles.signupButton}
            />

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>
                Already have an account?{" "}
              </Text>

              <TouchableOpacity
                onPress={() => router.replace("/(auth)/login" as never)}
              >
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.securityNote}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={Colors.success}
              />
              <Text style={styles.securityText}>
                Your information is handled securely.
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
    paddingTop: 32,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: Colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  appName: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.extraBold,
    color: Colors.white,
  },
  tagline: {
    fontSize: Typography.fontSize.sm,
    color: Colors.white,
    marginTop: Spacing.xs,
    textAlign: "center",
  },
  form: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: 28,
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
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  errorText: {
    flex: 1,
    color: Colors.error,
    fontSize: Typography.fontSize.sm,
  },
  signupButton: {
    marginTop: Spacing.lg,
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: Spacing.xl,
  },
  loginText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },
  loginLink: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    marginTop: 26,
  },
  securityText: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
});
