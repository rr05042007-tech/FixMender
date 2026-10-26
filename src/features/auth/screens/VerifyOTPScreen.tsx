
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

import Colors from "../../../../components/constants/colors";
import Spacing from "../../../../components/constants/spacing";
import Typography from "../../../../components/constants/typography";
import AppButton from "../../../../src/components/AppButton";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function VerifyOTPScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string; phone?: string }>();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setTimeout(() => {
      setSecondsLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const destination = params.email || params.phone || "your account";

  const handleVerify = async () => {
    setError("");

    if (otp.length !== OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      // TODO: Call your backend OTP verification API here.
      Alert.alert(
        "Verification not connected",
        "Your OTP format is valid, but a backend is required to verify it."
      );
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || resending) return;

    try {
      setResending(true);
      setError("");

      // TODO: Call your backend resend-OTP API here.
      Alert.alert(
        "Resend OTP not connected",
        "Connect your backend to send a new OTP."
      );

      // Start a new countdown only after the resend API succeeds.
      // Add setSecondsLeft(RESEND_SECONDS) after successful integration.
    } catch {
      setError("Unable to resend OTP. Please try again.");
    } finally {
      setResending(false);
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={Colors.text}
            />
          </TouchableOpacity>

          <View style={styles.iconContainer}>
            <Ionicons
              name="shield-checkmark-outline"
              size={42}
              color={Colors.white}
            />
          </View>

          <Text style={styles.title}>Verify OTP</Text>

          <Text style={styles.subtitle}>
            Enter the 6-digit verification code sent to:
          </Text>

          <Text style={styles.destination}>{destination}</Text>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
            style={styles.otpContainer}
            accessibilityLabel="Enter your six digit verification code"
          >
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  otp.length === index && styles.otpBoxActive,
                  error ? styles.otpBoxError : null,
                ]}
              >
                <Text style={styles.otpDigit}>
                  {otp[index] || ""}
                </Text>
              </View>
            ))}
          </TouchableOpacity>

          <TextInput
            ref={inputRef}
            value={otp}
            onChangeText={(value) => {
              setOtp(value.replace(/\D/g, "").slice(0, OTP_LENGTH));
              setError("");
            }}
            keyboardType="number-pad"
            maxLength={OTP_LENGTH}
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            caretHidden
            style={styles.hiddenInput}
            accessibilityLabel="OTP input"
          />

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <AppButton
            title="Verify & Continue"
            onPress={handleVerify}
            loading={loading}
            fullWidth
            style={styles.verifyButton}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendLabel}>
              Didn't receive the code?{" "}
            </Text>

            <TouchableOpacity
              onPress={handleResend}
              disabled={secondsLeft > 0 || resending}
              accessibilityRole="button"
            >
              <Text
                style={[
                  styles.resendLink,
                  secondsLeft > 0 && styles.resendDisabled,
                ]}
              >
                {resending
                  ? "Sending..."
                  : secondsLeft > 0
                    ? `Resend in ${secondsLeft}s`
                    : "Resend OTP"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.helpContainer}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={Colors.textSecondary}
            />
            <Text style={styles.helpText}>
              Make sure your phone has network coverage or check your email
              inbox and spam folder.
            </Text>
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
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },

  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xxl,
  },

  iconContainer: {
    width: 84,
    height: 84,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 28,
    marginBottom: Spacing.xl,
  },

  title: {
    textAlign: "center",
    color: Colors.text,
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
  },

  subtitle: {
    textAlign: "center",
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.md,
    marginTop: Spacing.md,
  },

  destination: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
    marginTop: Spacing.sm,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.sm,
    marginTop: Spacing.xxxl,
  },

  otpBox: {
    width: 44,
    height: 54,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.radiusMedium,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.inputBackground,
  },

  otpBoxActive: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },

  otpBoxError: {
    borderColor: Colors.error,
  },

  otpDigit: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },

  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
    bottom: 0,
    left: 0,
  },

  errorText: {
    color: Colors.error,
    fontSize: Typography.fontSize.sm,
    marginTop: Spacing.md,
    textAlign: "center",
  },

  verifyButton: {
    marginTop: Spacing.xxl,
  },

  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: Spacing.xxl,
  },

  resendLabel: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
  },

  resendLink: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },

  resendDisabled: {
    color: Colors.textLight,
  },

  helpContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    marginTop: Spacing.xxxl,
    padding: Spacing.md,
    backgroundColor: Colors.backgroundLight,
    borderRadius: Spacing.radiusMedium,
  },

  helpText: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
    lineHeight: Typography.lineHeight.sm,
  },
});
