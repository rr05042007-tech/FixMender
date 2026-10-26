
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignup = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      Alert.alert(
        "Invalid mobile number",
        "Enter a 10-digit mobile number."
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Weak password",
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Your passwords do not match.");
      return;
    }

    // Demo only: connect authentication before creating real accounts.
    Alert.alert(
      "Form validated",
      "Connect your authentication service to complete registration.",
      [
        {
          text: "Go to Login",
          onPress: () => router.replace("/(auth)/login"),
        },
      ]
    );
  };

  const renderPasswordInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    visible: boolean,
    toggleVisibility: () => void
  ) => (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888888"
        />
        <TextInput
          style={styles.input}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor="#999999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          autoCapitalize="none"
          accessibilityLabel={label}
        />
        <TouchableOpacity
          onPress={toggleVisibility}
          accessibilityRole="button"
          accessibilityLabel={visible ? "Hide password" : "Show password"}
        >
          <Ionicons
            name={visible ? "eye-off-outline" : "eye-outline"}
            size={21}
            color="#777777"
          />
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/(auth)/login")}
          accessibilityRole="button"
          accessibilityLabel="Back to login"
        >
          <Ionicons name="arrow-back" size={22} color="#A20D18" />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="construct" size={34} color="#A20D18" />
          </View>
          <Text style={styles.brand}>FixMender</Text>
          <Text style={styles.tagline}>
            Your Vehicle, Our Priority.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join FixMender for reliable vehicle assistance.
          </Text>

          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputBox}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#888888"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#999999"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              accessibilityLabel="Full name"
            />
          </View>

          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#888888" />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Email address"
            />
          </View>

          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputBox}>
            <Ionicons name="call-outline" size={20} color="#888888" />
            <TextInput
              style={styles.input}
              placeholder="10-digit mobile number"
              placeholderTextColor="#999999"
              value={phone}
              onChangeText={(text) =>
                setPhone(text.replace(/\D/g, "").slice(0, 10))
              }
              keyboardType="phone-pad"
              maxLength={10}
              accessibilityLabel="Mobile number"
            />
          </View>

          {renderPasswordInput(
            "Password",
            password,
            setPassword,
            showPassword,
            () => setShowPassword(!showPassword)
          )}

          {renderPasswordInput(
            "Confirm Password",
            confirmPassword,
            setConfirmPassword,
            showConfirm,
            () => setShowConfirm(!showConfirm)
          )}

          <Text style={styles.hint}>
            Use at least 8 characters for your password.
          </Text>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            activeOpacity={0.85}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
            <Ionicons name="arrow-forward" size={19} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginLabel}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.replace("/(auth)/login")}
            >
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footer}>
          By registering, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7F7",
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingVertical: 22,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1D5D7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 22,
  },
  logo: {
    width: 66,
    height: 66,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1D5D7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },
  brand: {
    fontSize: 27,
    fontWeight: "800",
    color: "#A20D18",
  },
  tagline: {
    fontSize: 12,
    color: "#777777",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 21,
    borderWidth: 1,
    borderColor: "#F1E4E4",
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#252525",
  },
  subtitle: {
    fontSize: 13,
    color: "#777777",
    lineHeight: 19,
    marginTop: 7,
    marginBottom: 23,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  inputBox: {
    minHeight: 51,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 17,
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#252525",
    paddingVertical: 10,
  },
  hint: {
    color: "#777777",
    fontSize: 11,
    marginTop: -6,
    marginBottom: 20,
  },
  signupButton: {
    minHeight: 52,
    backgroundColor: "#A20D18",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  signupButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 22,
  },
  loginLabel: {
    fontSize: 13,
    color: "#777777",
  },
  loginLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#A20D18",
  },
  footer: {
    color: "#777777",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 17,
    marginTop: 20,
    paddingHorizontal: 8,
  },
});
