
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const RED = "#8B0000";
const WHITE = "#FFFFFF";
const DARK = "#222222";
const GRAY = "#777777";
const BG = "#FAFAFA";
const LIGHT_RED = "#FFF0F0";
const BORDER = "#EEEEEE";

const locationTypes = [
  { label: "Home", icon: "home-outline" as const },
  { label: "Work", icon: "briefcase-outline" as const },
  { label: "Other", icon: "location-outline" as const },
];

export default function LocationScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    vehicleType?: string;
    powerType?: string;
    company?: string;
    model?: string;
    issue?: string;
    description?: string;
  }>();

  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedType, setSelectedType] = useState("Home");
  const [saveAddress, setSaveAddress] = useState(true);

  const confirmLocation = () => {
    if (!address.trim() || !city.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your address and city."
      );
      return;
    }

    if (pincode && !/^\d{6}$/.test(pincode)) {
      Alert.alert(
        "Invalid PIN Code",
        "Please enter a valid 6-digit Indian PIN code."
      );
      return;
    }

    const fullLocation = [
      address.trim(),
      landmark.trim(),
      city.trim(),
      pincode.trim(),
    ]
      .filter(Boolean)
      .join(", ");

    // Pass the address back to the SOS screen.
    router.replace({
      pathname: "/sos",
      params: {
        vehicleType: params.vehicleType ?? "",
        powerType: params.powerType ?? "",
        company: params.company ?? "",
        model: params.model ?? "",
        issue: params.issue ?? "",
        description: params.description ?? "",
        location: fullLocation,
        locationType: selectedType,
        saveAddress: String(saveAddress),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={RED} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={23} color={WHITE} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Service Location</Text>
          <Text style={styles.headerSubtitle}>
            Where should the mechanic reach you?
          </Text>
        </View>

        <Ionicons name="location" size={27} color={WHITE} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Location Illustration */}
        <View style={styles.locationIllustration}>
          <View style={styles.pinCircle}>
            <Ionicons name="location" size={45} color={RED} />
          </View>

          <Text style={styles.illustrationTitle}>
            Add your service address
          </Text>
          <Text style={styles.illustrationSubtitle}>
            Enter a clear location to help the mechanic find you.
          </Text>
        </View>

        {/* GPS Placeholder */}
        <TouchableOpacity
          style={styles.gpsButton}
          onPress={() =>
            Alert.alert(
              "GPS Location",
              "Automatic GPS is not connected yet. Please enter your address manually."
            )
          }
          activeOpacity={0.8}
        >
          <View style={styles.gpsIcon}>
            <Ionicons name="navigate" size={22} color={WHITE} />
          </View>

          <View style={styles.gpsTextContainer}>
            <Text style={styles.gpsTitle}>Use Current Location</Text>
            <Text style={styles.gpsSubtitle}>
              GPS permission and location service required
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={RED} />
        </TouchableOpacity>

        {/* Address Form */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Address Details</Text>

          <Text style={styles.fieldLabel}>House / Street Address *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="home-outline" size={19} color={GRAY} />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="House no., street, area"
              placeholderTextColor="#999999"
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.fieldLabel}>Landmark (Optional)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="flag-outline" size={19} color={GRAY} />
            <TextInput
              style={styles.input}
              value={landmark}
              onChangeText={setLandmark}
              placeholder="Near a shop, school, or petrol pump"
              placeholderTextColor="#999999"
              autoCapitalize="sentences"
            />
          </View>

          <Text style={styles.fieldLabel}>City *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="business-outline" size={19} color={GRAY} />
            <TextInput
              style={styles.input}
              value={city}
              onChangeText={setCity}
              placeholder="Enter your city"
              placeholderTextColor="#999999"
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.fieldLabel}>PIN Code (Optional)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={19} color={GRAY} />
            <TextInput
              style={styles.input}
              value={pincode}
              onChangeText={(value) =>
                setPincode(value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="6-digit PIN code"
              placeholderTextColor="#999999"
              keyboardType="number-pad"
              maxLength={6}
            />
          </View>

          {/* Address Type */}
          <Text style={styles.fieldLabel}>Save Location As</Text>

          <View style={styles.typeRow}>
            {locationTypes.map((item) => {
              const selected = selectedType === item.label;

              return (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.typeButton,
                    selected && styles.typeButtonSelected,
                  ]}
                  onPress={() => setSelectedType(item.label)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={item.icon}
                    size={19}
                    color={selected ? RED : GRAY}
                  />
                  <Text
                    style={[
                      styles.typeText,
                      selected && styles.typeTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Save Checkbox */}
          <TouchableOpacity
            style={styles.saveRow}
            onPress={() => setSaveAddress(!saveAddress)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={saveAddress ? "checkbox" : "square-outline"}
              size={22}
              color={saveAddress ? RED : GRAY}
            />
            <Text style={styles.saveText}>
              Save this address for future bookings
            </Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyNote}>
          <Ionicons name="shield-checkmark-outline" size={20} color={RED} />
          <Text style={styles.privacyText}>
            Your address is intended for arranging vehicle service. This demo
            does not send it to a mechanic or save it permanently.
          </Text>
        </View>

        {/* Confirm */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmLocation}
          activeOpacity={0.85}
        >
          <Ionicons name="checkmark-circle-outline" size={22} color={WHITE} />
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
          <Ionicons name="arrow-forward" size={20} color={WHITE} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  header: {
    backgroundColor: RED,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#F5DADA",
    fontSize: 11,
    marginTop: 5,
  },
  content: {
    paddingHorizontal: 19,
    paddingTop: 20,
    paddingBottom: 35,
  },
  locationIllustration: {
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 15,
  },
  pinCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F1D2D2",
  },
  illustrationTitle: {
    color: DARK,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 15,
    textAlign: "center",
  },
  illustrationSubtitle: {
    color: GRAY,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
    marginTop: 6,
    paddingHorizontal: 12,
  },
  gpsButton: {
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EBD0D0",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  gpsIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
  },
  gpsTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  gpsTitle: {
    color: DARK,
    fontSize: 13,
    fontWeight: "800",
  },
  gpsSubtitle: {
    color: GRAY,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  formCard: {
    backgroundColor: WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
  },
  sectionTitle: {
    color: DARK,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  fieldLabel: {
    color: DARK,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 8,
  },
  inputContainer: {
    minHeight: 50,
    backgroundColor: "#FCFCFC",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: DARK,
    fontSize: 13,
    marginLeft: 10,
    paddingVertical: 12,
  },
  typeRow: {
    flexDirection: "row",
    gap: 9,
    marginTop: 2,
  },
  typeButton: {
    flex: 1,
    minHeight: 47,
    borderRadius: 12,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  typeButtonSelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
  },
  typeText: {
    color: GRAY,
    fontSize: 11,
    fontWeight: "600",
  },
  typeTextSelected: {
    color: RED,
    fontWeight: "800",
  },
  saveRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 9,
  },
  saveText: {
    color: DARK,
    fontSize: 11,
    flex: 1,
    lineHeight: 17,
  },
  privacyNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    marginTop: 18,
    paddingHorizontal: 4,
  },
  privacyText: {
    color: GRAY,
    fontSize: 10,
    lineHeight: 16,
    flex: 1,
  },
  confirmButton: {
    backgroundColor: RED,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 16,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  confirmButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "800",
    flex: 1,
    textAlign: "center",
  },
  cancelButton: {
    alignItems: "center",
    paddingVertical: 15,
  },
  cancelButtonText: {
    color: RED,
    fontSize: 13,
    fontWeight: "700",
  },
});
