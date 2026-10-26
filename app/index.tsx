
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#780710"
      />

      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>🔧</Text>
      </View>

      <Text style={styles.title}>FixMender</Text>

      <Text style={styles.tagline}>
        Your Vehicle, Our Priority.
      </Text>

      <View style={styles.features}>
        <Text style={styles.feature}>
          ✓  Quick Vehicle Repair
        </Text>
        <Text style={styles.feature}>
          ✓  Nearby Trusted Garages
        </Text>
        <Text style={styles.feature}>
          ✓  Emergency Roadside Assistance
        </Text>
      </View>

      <View style={styles.bottom}>
        <ActivityIndicator color="#FFFFFF" size="small" />
        <Text style={styles.loading}>Getting things ready...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#780710",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoIcon: {
    fontSize: 48,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    color: "#F9DCDD",
    marginTop: 8,
  },
  features: {
    marginTop: 38,
    gap: 16,
    alignSelf: "stretch",
    backgroundColor: "#920D18",
    padding: 20,
    borderRadius: 16,
  },
  feature: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  bottom: {
    position: "absolute",
    bottom: 45,
    alignItems: "center",
    gap: 10,
  },
  loading: {
    color: "#F9DCDD",
    fontSize: 12,
  },
});
