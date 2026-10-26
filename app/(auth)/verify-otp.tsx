
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function VerifyOtpScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const [resending, setResending] = useState(false);

  const inputs = useRef<Array<TextInput | null>>([]);
  const { email } = useLocalSearchParams<{ email?: string }>();

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const handleOtpChange = (value: string, index: number) => {
    const digits = value.replace(/\D/g, "");

    // Support pasting an entire OTP.
    if (digits.length > 1) {
      const pastedOtp = digits.slice(0, 6).split("");
      const updated = ["", "", "", "", "", ""];
      pastedOtp.forEach((digit, i) => {
        updated[i] = digit;
      });
      setOtp(updated);
      inputs.current[Math.min(pastedOtp.length, 5)]?.focus();
      return;
    }

    const updated = [...otp];
    updated[index] = digits;
    setOtp(updated);

    if (digits && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    key: string,
    index: number
  ) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");

    if (code.length !== 6) {
      Alert.alert(
        "Incomplete OTP",
        "Please enter all 6 digits."
      );
      return;
    }

    // Demo only: this does not verify the code with a server.
    Alert.alert(
      "Demo verification",
      "OTP format is valid. Connect your authentication provider to verify the actual code.",
      [
        {
          text: "Continue to Home (Demo)",
          onPress: () => router.replace("/(tabs)/home"),
        },
      ]
    );
  };

  const handleResend = async () => {
    if (seconds > 0 || resending) return;

    setResending(true);

    try {
      // Connect your real OTP resend API here.
      setOtp(["", "", "", "", "", ""]);
      setSeconds(30);
      inputs.current[0]?.focus();

      Alert.alert(
        "Demo only",
        "Connect your authentication provider to send a new OTP."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color="#A20D18" />
        </TouchableOpacity>

        <View style={styles.logo}>
          <Ionicons
            name="shield-checkmark-outline"
            size={38}
            color="#A20D18"
          />
        </View>

        <Text style={styles.brand}>FixMender</Text>
        <Text style={styles.title}>Verify Your Account</Text>

        <Text style={styles.subtitle}>
          Enter the 6-digit verification code sent to
        </Text>
        <Text style={styles.email}>
          {email || "your registered email or mobile"}
        </Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                digit ? styles.otpFilled : null,
              ]}
              value={digit}
              onChangeText={(value) =>
                handleOtpChange(value, index)
              }
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(nativeEvent.key, index)
              }
              keyboardType="number-pad"
              maxLength={6}
              selectTextOnFocus
              textContentType="oneTimeCode"
              accessibilityLabel={`OTP digit ${index + 1}`}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerify}
          activeOpacity={0.85}
        >
          <Text style={styles.verifyText}>Verify OTP</Text>
          <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendLabel}>
            Didn't receive the code?{" "}
          </Text>

          <TouchableOpacity
            onPress={handleResend}
            disabled={seconds > 0 || resending}
          >
            <Text
              style={[
                styles.resendText,
                seconds > 0 ? styles.disabledText : null,
              ]}
            >
              {resending
                ? "Sending..."
                : seconds > 0
                ? `Resend in ${seconds}s`
                : "Resend OTP"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.securityNote}>
          <Ionicons
            name="lock-closed-outline"
            size={16}
            color="#777777"
          />
          <Text style={styles.securityText}>
            Never share your verification code with anyone.
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7F7",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  backButton: {
    position: "absolute",
    top: 28,
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1D5D7",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1D5D7",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  brand: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "800",
    color: "#A20D18",
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#252525",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 21,
  },
  email: {
    color: "#A20D18",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 32,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 30,
  },
  otpInput: {
    width: 43,
    height: 54,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    color: "#252525",
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
  },
  otpFilled: {
    borderColor: "#A20D18",
    backgroundColor: "#FFF0F1",
  },
  verifyButton: {
    minHeight: 52,
    backgroundColor: "#A20D18",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  verifyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 25,
  },
  resendLabel: {
    color: "#777777",
    fontSize: 13,
  },
  resendText: {
    color: "#A20D18",
    fontWeight: "700",
    fontSize: 13,
  },
  disabledText: {
    color: "#999999",
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 35,
  },
  securityText: {
    fontSize: 11,
    color: "#777777",
    textAlign: "center",
  },
});
