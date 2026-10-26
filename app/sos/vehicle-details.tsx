
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

type VehicleOption = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  category: "2-Wheeler" | "4-Wheeler" | "Heavy Vehicle";
  power: "Electric" | "Non-Electric";
};

const vehicles: VehicleOption[] = [
  { label: "Bike", icon: "bicycle-outline", category: "2-Wheeler", power: "Non-Electric" },
  { label: "Electric Bike", icon: "bicycle-outline", category: "2-Wheeler", power: "Electric" },
  { label: "Scooty", icon: "bicycle-outline", category: "2-Wheeler", power: "Non-Electric" },
  { label: "Electric Scooty", icon: "bicycle-outline", category: "2-Wheeler", power: "Electric" },
  { label: "Car", icon: "car-sport-outline", category: "4-Wheeler", power: "Non-Electric" },
  { label: "Electric Car", icon: "car-sport-outline", category: "4-Wheeler", power: "Electric" },
  { label: "Electric Rickshaw", icon: "bus-outline", category: "3-Wheeler" as VehicleOption["category"], power: "Electric" },
  { label: "Truck", icon: "bus-outline", category: "Heavy Vehicle", power: "Non-Electric" },
  { label: "Heavy Vehicle", icon: "bus-outline", category: "Heavy Vehicle", power: "Non-Electric" },
];

const brands = [
  "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Toyota",
  "Honda", "Kia", "MG", "Hero", "Honda 2-Wheelers",
  "TVS", "Bajaj", "Royal Enfield", "Ather", "Ola Electric",
  "Ashok Leyland", "Eicher", "Other",
];

export default function VehicleDetailsScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    vehicleType?: string;
    powerType?: string;
    company?: string;
    model?: string;
  }>();

  const [powerType, setPowerType] = useState(
    params.powerType === "Electric" ? "Electric" : "Non-Electric"
  );
  const [category, setCategory] = useState(
    params.vehicleType ?? "2-Wheeler"
  );
  const [vehicleName, setVehicleName] = useState("");
  const [company, setCompany] = useState(params.company ?? "");
  const [model, setModel] = useState(params.model ?? "");
  const [registration, setRegistration] = useState("");

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.power === powerType &&
      (category === "All" || vehicle.category === category)
  );

  const continueToProblem = () => {
    if (!vehicleName) {
      Alert.alert("Select Vehicle", "Please select your vehicle type.");
      return;
    }

    if (!company.trim()) {
      Alert.alert("Vehicle Brand Required", "Please enter or select your vehicle brand.");
      return;
    }

    if (!model.trim()) {
      Alert.alert("Model Required", "Please enter your vehicle model.");
      return;
    }

    router.push({
      pathname: "/sos/problem-details",
      params: {
        vehicleType: category,
        powerType,
        company: company.trim(),
        model: model.trim(),
        vehicleName,
        registration: registration.trim(),
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={RED} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={23} color={WHITE} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Vehicle Details</Text>
          <Text style={styles.headerSubtitle}>
            Tell us about your vehicle
          </Text>
        </View>

        <Ionicons name="car-sport-outline" size={30} color={WHITE} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressItem}>
            <View style={styles.activeStep}>
              <Text style={styles.activeStepText}>1</Text>
            </View>
            <Text style={styles.progressLabelActive}>Vehicle</Text>
          </View>

          <View style={styles.progressLine} />

          <View style={styles.progressItem}>
            <View style={styles.inactiveStep}>
              <Text style={styles.inactiveNumber}>2</Text>
            </View>
            <Text style={styles.progressLabel}>Problem</Text>
          </View>

          <View style={styles.progressLine} />

          <View style={styles.progressItem}>
            <View style={styles.inactiveStep}>
              <Text style={styles.inactiveNumber}>3</Text>
            </View>
            <Text style={styles.progressLabel}>Location</Text>
          </View>
        </View>

        {/* Power Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Power Type</Text>
          <Text style={styles.sectionSubtitle}>
            Choose how your vehicle is powered.
          </Text>

          <View style={styles.optionRow}>
            {[
              { label: "Electric", icon: "flash-outline" as const },
              { label: "Non-Electric", icon: "water-outline" as const },
            ].map((item) => {
              const selected = powerType === item.label;

              return (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.powerCard,
                    selected && styles.selectedCard,
                  ]}
                  onPress={() => {
                    setPowerType(item.label);
                    setVehicleName("");
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={25}
                    color={selected ? RED : GRAY}
                  />
                  <Text
                    style={[
                      styles.powerLabel,
                      selected && styles.selectedText,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={RED}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Category</Text>

          <View style={styles.categoryRow}>
            {["2-Wheeler", "4-Wheeler", "Heavy Vehicle"].map((item) => {
              const selected = category === item;

              return (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.categoryButton,
                    selected && styles.categorySelected,
                  ]}
                  onPress={() => {
                    setCategory(item);
                    setVehicleName("");
                  }}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.selectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Vehicle Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Your Vehicle</Text>
          <Text style={styles.sectionSubtitle}>
            Select the vehicle that needs assistance.
          </Text>

          <View style={styles.vehicleGrid}>
            {filteredVehicles.map((vehicle) => {
              const selected = vehicleName === vehicle.label;

              return (
                <TouchableOpacity
                  key={vehicle.label}
                  style={[
                    styles.vehicleCard,
                    selected && styles.selectedCard,
                  ]}
                  onPress={() => setVehicleName(vehicle.label)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.vehicleIconBox,
                      selected && styles.vehicleIconSelected,
                    ]}
                  >
                    <Ionicons
                      name={vehicle.icon}
                      size={29}
                      color={selected ? RED : GRAY}
                    />
                  </View>

                  <Text
                    style={[
                      styles.vehicleLabel,
                      selected && styles.selectedText,
                    ]}
                  >
                    {vehicle.label}
                  </Text>

                  {selected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={17}
                      color={RED}
                      style={styles.vehicleCheck}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {filteredVehicles.length === 0 && (
            <Text style={styles.emptyText}>
              No vehicles available for this selection.
            </Text>
          )}
        </View>

        {/* Brand */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Brand</Text>
          <Text style={styles.sectionSubtitle}>
            Select a common brand or enter another one.
          </Text>

          <View style={styles.brandGrid}>
            {brands.map((brand) => {
              const selected = company === brand;

              return (
                <TouchableOpacity
                  key={brand}
                  style={[
                    styles.brandChip,
                    selected && styles.brandChipSelected,
                  ]}
                  onPress={() => setCompany(brand)}
                >
                  <Text
                    style={[
                      styles.brandText,
                      selected && styles.selectedText,
                    ]}
                  >
                    {brand}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Or enter your vehicle brand"
            placeholderTextColor="#999999"
            value={company}
            onChangeText={setCompany}
            autoCapitalize="words"
          />
        </View>

        {/* Model */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Model</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Swift, Activa 6G, Nexon EV"
            placeholderTextColor="#999999"
            value={model}
            onChangeText={setModel}
            autoCapitalize="words"
          />
        </View>

        {/* Registration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Registration Number (Optional)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. RJ14 AB 1234"
            placeholderTextColor="#999999"
            value={registration}
            onChangeText={setRegistration}
            autoCapitalize="characters"
            maxLength={15}
          />
        </View>

        {/* Tip */}
        <View style={styles.tipCard}>
          <Ionicons name="information-circle-outline" size={23} color={RED} />
          <Text style={styles.tipText}>
            Correct vehicle details help you describe your issue and find
            suitable assistance more easily.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={continueToProblem}
          activeOpacity={0.85}
        >
          <Text style={styles.continueText}>Continue to Problem</Text>
          <Ionicons name="arrow-forward" size={21} color={WHITE} />
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Your details are used for this demo service request.
        </Text>
      </ScrollView>
    </View>
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
    paddingBottom: 25,
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
  progressCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressItem: {
    alignItems: "center",
    minWidth: 54,
  },
  activeStep: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
  },
  activeStepText: {
    color: WHITE,
    fontWeight: "800",
    fontSize: 13,
  },
  inactiveStep: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveNumber: {
    color: GRAY,
    fontSize: 13,
    fontWeight: "700",
  },
  progressLabelActive: {
    color: RED,
    fontSize: 10,
    fontWeight: "800",
    marginTop: 6,
  },
  progressLabel: {
    color: GRAY,
    fontSize: 10,
    marginTop: 6,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: BORDER,
    marginHorizontal: 7,
    marginBottom: 17,
  },
  content: {
    paddingHorizontal: 19,
    paddingTop: 20,
    paddingBottom: 35,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    color: DARK,
    fontSize: 16,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: GRAY,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 5,
    marginBottom: 13,
  },
  optionRow: {
    flexDirection: "row",
    gap: 12,
  },
  powerCard: {
    flex: 1,
    minHeight: 78,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 7,
  },
  selectedCard: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
    borderWidth: 1.5,
  },
  powerLabel: {
    flex: 1,
    color: DARK,
    fontSize: 12,
    fontWeight: "700",
  },
  selectedText: {
    color: RED,
    fontWeight: "800",
  },
  categoryRow: {
    flexDirection: "row",
    gap: 7,
    marginTop: 12,
  },
  categoryButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 5,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  categorySelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
  },
  categoryText: {
    color: DARK,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
  },
  vehicleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  vehicleCard: {
    width: "31.5%",
    minHeight: 115,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 12,
    position: "relative",
  },
  vehicleIconBox: {
    width: 48,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleIconSelected: {
    backgroundColor: "#FFE0E0",
  },
  vehicleLabel: {
    color: DARK,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 9,
  },
  vehicleCheck: {
    position: "absolute",
    right: 5,
    top: 5,
  },
  emptyText: {
    color: GRAY,
    fontSize: 12,
    marginTop: 10,
  },
  brandGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  brandChip: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  brandChipSelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
  },
  brandText: {
    color: DARK,
    fontSize: 11,
    fontWeight: "600",
  },
  input: {
    minHeight: 49,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    color: DARK,
    fontSize: 13,
    marginTop: 12,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 13,
    backgroundColor: LIGHT_RED,
    borderRadius: 13,
    marginTop: 25,
  },
  tipText: {
    flex: 1,
    color: DARK,
    fontSize: 11,
    lineHeight: 17,
  },
  continueButton: {
    backgroundColor: RED,
    borderRadius: 14,
    paddingHorizontal: 17,
    paddingVertical: 16,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  continueText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "800",
    flex: 1,
    textAlign: "center",
  },
  footerText: {
    color: GRAY,
    fontSize: 10,
    textAlign: "center",
    lineHeight: 16,
    marginTop: 13,
  },
});
