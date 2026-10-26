```tsx
// app/vehicle/add.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const RED = "#8B0000";
const LIGHT_RED = "#FFF0F0";
const BG = "#F7F7F7";
const TEXT = "#202020";
const MUTED = "#777777";

const VEHICLE_TYPES = [
  "2-Wheeler",
  "3-Wheeler",
  "4-Wheeler",
  "Heavy Vehicle",
];

const POWER_TYPES = ["Electric", "Non-Electric"];

export default function AddVehicleScreen() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [vehicleType, setVehicleType] = useState("2-Wheeler");
  const [powerType, setPowerType] = useState("Non-Electric");
  const [company, setCompany] = useState("");
  const [model, setModel] = useState("");
  const [registration, setRegistration] = useState("");
  const [fuelType, setFuelType] = useState("Petrol");
  const [isDefault, setIsDefault] = useState(false);

  const fuelOptions =
    powerType === "Electric"
      ? ["Battery / EV"]
      : ["Petrol", "Diesel", "CNG", "Hybrid"];

  const handlePowerChange = (value: string) => {
    setPowerType(value);
    setFuelType(value === "Electric" ? "Battery / EV" : "Petrol");
  };

  const saveVehicle = () => {
    if (!company.trim()) {
      Alert.alert("Required field", "Please enter the vehicle company.");
      return;
    }

    if (!model.trim()) {
      Alert.alert("Required field", "Please enter the vehicle model.");
      return;
    }

    const normalizedRegistration = registration
      .trim()
      .toUpperCase();

    if (
      normalizedRegistration &&
      !/^[A-Z0-9 -]{4,15}$/.test(normalizedRegistration)
    ) {
      Alert.alert(
        "Invalid registration",
        "Please enter a valid-looking registration number, or leave it blank."
      );
      return;
    }

    const vehicle = {
      nickname: nickname.trim() || `${company.trim()} ${model.trim()}`,
      vehicleType,
      powerType,
      company: company.trim(),
      model: model.trim(),
      registration: normalizedRegistration,
      fuelType,
      isDefault,
    };

    // Demo only: this object is not stored permanently.
    Alert.alert(
      "Vehicle details ready",
      `${vehicle.nickname} has been entered successfully.\n\nConnect a database or local storage to save this vehicle permanently.`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
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
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Add Vehicle</Text>
          <Text style={styles.headerSubtitle}>
            Add your vehicle details to FixMender
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="car-sport-outline" size={25} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro */}
        <View style={styles.introCard}>
          <View style={styles.introIcon}>
            <Ionicons name="car-outline" size={34} color={RED} />
          </View>
          <View style={styles.introText}>
            <Text style={styles.introTitle}>Your vehicle, your way</Text>
            <Text style={styles.introDescription}>
              Add accurate details to make future repair requests easier.
            </Text>
          </View>
        </View>

        {/* Nickname */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Basic information</Text>
          <Text style={styles.sectionSubtitle}>
            Give your vehicle a name and select its category.
          </Text>

          <Text style={styles.label}>Vehicle nickname (optional)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="bookmark-outline" size={19} color={MUTED} />
            <TextInput
              style={styles.input}
              placeholder="e.g. My Daily Ride"
              placeholderTextColor="#999999"
              value={nickname}
              onChangeText={setNickname}
              maxLength={40}
            />
          </View>

          <Text style={styles.label}>Vehicle category *</Text>
          <View style={styles.optionGrid}>
            {VEHICLE_TYPES.map((type) => {
              const selected = vehicleType === type;

              return (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.categoryOption,
                    selected && styles.selectedOption,
                  ]}
                  onPress={() => setVehicleType(type)}
                >
                  <Ionicons
                    name={
                      type === "2-Wheeler"
                        ? "bicycle-outline"
                        : type === "3-Wheeler"
                          ? "car-outline"
                          : type === "4-Wheeler"
                            ? "car-sport-outline"
                            : "bus-outline"
                    }
                    size={22}
                    color={selected ? "#FFFFFF" : RED}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.selectedOptionText,
                    ]}
                  >
                    {type}
                  </Text>
                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={17}
                      color="#FFFFFF"
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Power type *</Text>
          <View style={styles.powerRow}>
            {POWER_TYPES.map((type) => {
              const selected = powerType === type;

              return (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.powerOption,
                    selected && styles.selectedOption,
                  ]}
                  onPress={() => handlePowerChange(type)}
                >
                  <Ionicons
                    name={
                      type === "Electric"
                        ? "flash-outline"
                        : "speedometer-outline"
                    }
                    size={21}
                    color={selected ? "#FFFFFF" : RED}
                  />
                  <Text
                    style={[
                      styles.powerText,
                      selected && styles.selectedOptionText,
                    ]}
                  >
                    {type}
                  </Text>
                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={17}
                      color="#FFFFFF"
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Vehicle details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Vehicle details</Text>
          <Text style={styles.sectionSubtitle}>
            Enter the manufacturer and model information.
          </Text>

          <Text style={styles.label}>Company / Brand *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="business-outline" size={19} color={MUTED} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Tata, Honda, Hero, Mahindra"
              placeholderTextColor="#999999"
              value={company}
              onChangeText={setCompany}
              autoCapitalize="words"
              maxLength={50}
            />
          </View>

          <Text style={styles.label}>Model *</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="car-outline" size={19} color={MUTED} />
            <TextInput
              style={styles.input}
              placeholder="e.g. Nexon, Activa, Splendor"
              placeholderTextColor="#999999"
              value={model}
              onChangeText={setModel}
              autoCapitalize="words"
              maxLength={50}
            />
          </View>

          <Text style={styles.label}>Fuel / energy type *</Text>
          <View style={styles.fuelOptions}>
            {fuelOptions.map((fuel) => {
              const selected = fuelType === fuel;

              return (
                <TouchableOpacity
                  key={fuel}
                  style={[
                    styles.fuelChip,
                    selected && styles.fuelChipSelected,
                  ]}
                  onPress={() => setFuelType(fuel)}
                >
                  <Text
                    style={[
                      styles.fuelChipText,
                      selected && styles.fuelChipTextSelected,
                    ]}
                  >
                    {fuel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Registration number (optional)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="document-text-outline" size={19} color={MUTED} />
            <TextInput
              style={styles.input}
              placeholder="e.g. RJ14 AB 1234"
              placeholderTextColor="#999999"
              value={registration}
              onChangeText={(value) =>
                setRegistration(value.toUpperCase())
              }
              autoCapitalize="characters"
              maxLength={15}
            />
          </View>
          <Text style={styles.helperText}>
            Your registration number is optional for this demo.
          </Text>
        </View>

        {/* Default vehicle */}
        <TouchableOpacity
          style={styles.defaultCard}
          onPress={() => setIsDefault(!isDefault)}
          activeOpacity={0.8}
        >
          <View style={styles.defaultIcon}>
            <Ionicons name="star-outline" size={21} color={RED} />
          </View>
          <View style={styles.defaultTextContainer}>
            <Text style={styles.defaultTitle}>Set as primary vehicle</Text>
            <Text style={styles.defaultDescription}>
              Use this vehicle as your preferred choice.
            </Text>
          </View>
          <Ionicons
            name={isDefault ? "checkbox" : "square-outline"}
            size={24}
            color={isDefault ? RED : "#999999"}
          />
        </TouchableOpacity>

        {/* Save */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveVehicle}
          activeOpacity={0.85}
        >
          <Ionicons name="save-outline" size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Save Vehicle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          This prototype does not permanently save vehicle details. Add
          local storage or a backend to retain vehicles between sessions.
        </Text>
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
    paddingHorizontal: 17,
    paddingTop: 15,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#F6DADA",
    fontSize: 11,
    marginTop: 4,
  },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 35,
  },
  introCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0DEDE",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  introIcon: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  introText: {
    flex: 1,
    marginLeft: 13,
  },
  introTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "800",
  },
  introDescription: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 8,
  },
  label: {
    color: TEXT,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 8,
  },
  inputContainer: {
    minHeight: 49,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  input: {
    flex: 1,
    color: TEXT,
    fontSize: 13,
    paddingVertical: 12,
  },
  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 2,
  },
  categoryOption: {
    width: "48%",
    minHeight: 49,
    paddingHorizontal: 9,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#E7D1D1",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  selectedOption: {
    backgroundColor: RED,
    borderColor: RED,
  },
  categoryText: {
    flex: 1,
    color: TEXT,
    fontSize: 11,
    fontWeight: "700",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  powerRow: {
    flexDirection: "row",
    gap: 9,
  },
  powerOption: {
    flex: 1,
    minHeight: 49,
    paddingHorizontal: 8,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#E7D1D1",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  powerText: {
    color: TEXT,
    fontSize: 11,
    fontWeight: "700",
  },
  fuelOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  fuelChip: {
    borderWidth: 1,
    borderColor: "#E7D1D1",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: "#FFFFFF",
  },
  fuelChipSelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
  },
  fuelChipText: {
    color: TEXT,
    fontSize: 11,
    fontWeight: "600",
  },
  fuelChipTextSelected: {
    color: RED,
    fontWeight: "800",
  },
  helperText: {
    color: MUTED,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 7,
  },
  defaultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  defaultIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultTextContainer: {
    flex: 1,
    marginHorizontal: 11,
  },
  defaultTitle: {
    color: TEXT,
    fontSize: 13,
    fontWeight: "800",
  },
  defaultDescription: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  saveButton: {
    minHeight: 52,
    backgroundColor: RED,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  cancelButton: {
    minHeight: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 7,
  },
  cancelButtonText: {
    color: MUTED,
    fontSize: 13,
    fontWeight: "700",
  },
  disclaimer: {
    color: MUTED,
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 9,
    paddingHorizontal: 8,
  },
});
```