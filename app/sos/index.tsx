
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
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RED = "#8B0000";
const WHITE = "#FFFFFF";
const DARK = "#222222";
const GRAY = "#777777";
const BG = "#FAFAFA";
const LIGHT_RED = "#FFF0F0";
const BORDER = "#EEEEEE";

const vehicleTypes = [
  { label: "2-Wheeler", icon: "bicycle" as const },
  { label: "4-Wheeler", icon: "car-sport" as const },
  { label: "Heavy Vehicle", icon: "bus" as const },
];

const powerTypes = [
  { label: "Electric", icon: "flash" as const },
  { label: "Non-Electric", icon: "water" as const },
];

const issueTypes = [
  { label: "Engine Problem", icon: "construct-outline" as const },
  { label: "Battery Issue", icon: "battery-dead-outline" as const },
  { label: "Flat Tyre", icon: "disc-outline" as const },
  { label: "Breakdown", icon: "warning-outline" as const },
  { label: "Accident", icon: "alert-circle-outline" as const },
  { label: "Other", icon: "ellipsis-horizontal-circle-outline" as const },
];

export default function SOSScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    vehicleType?: string;
    company?: string;
  }>();

  const [powerType, setPowerType] = useState("");
  const [vehicleType, setVehicleType] = useState(
    params.vehicleType?.includes("2-Wheeler")
      ? "2-Wheeler"
      : params.vehicleType?.includes("4-Wheeler")
        ? "4-Wheeler"
        : ""
  );
  const [company, setCompany] = useState(params.company ?? "");
  const [model, setModel] = useState("");
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const requestHelp = () => {
    if (!powerType || !vehicleType || !company.trim() || !issue || !location.trim()) {
      Alert.alert(
        "Missing Information",
        "Please select your vehicle type, power type, issue, company, and location."
      );
      return;
    }

    setLoading(true);

    // Demo only: no mechanic is actually contacted.
    setTimeout(() => {
      setLoading(false);

      Alert.alert(
        "Request Prepared",
        `Vehicle: ${vehicleType}\nPower: ${powerType}\nCompany: ${company}\nIssue: ${issue}\nLocation: ${location}\n\nThis is a demo. Connect a backend to send a real SOS request.`,
        [
          {
            text: "OK",
            onPress: () => router.push("/(tabs)/bookings" as never),
          },
        ]
      );
    }, 800);
  };

  const OptionCard = ({
    label,
    icon,
    selected,
    onPress,
  }: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.optionCard, selected && styles.optionSelected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Ionicons
        name={icon}
        size={25}
        color={selected ? RED : GRAY}
      />
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
        {label}
      </Text>
      {selected && (
        <View style={styles.checkIcon}>
          <Ionicons name="checkmark-circle" size={17} color={RED} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={RED} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={23} color={WHITE} />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>SOS Assistance</Text>
            <Text style={styles.headerSubtitle}>
              Get help when your vehicle breaks down
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="alert-circle" size={29} color={WHITE} />
          </View>
        </View>

        <View style={styles.content}>
          {/* Emergency Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerIcon}>
              <Ionicons name="warning" size={26} color={RED} />
            </View>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>Need urgent help?</Text>
              <Text style={styles.bannerDescription}>
                Enter your vehicle details so the right assistance can be arranged.
              </Text>
            </View>
          </View>

          {/* Vehicle Power */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>1. Vehicle Power Type</Text>
            <Text style={styles.sectionSubtitle}>
              Select how your vehicle is powered
            </Text>

            <View style={styles.optionRow}>
              {powerTypes.map((item) => (
                <OptionCard
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  selected={powerType === item.label}
                  onPress={() => setPowerType(item.label)}
                />
              ))}
            </View>
          </View>

          {/* Vehicle Category */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Vehicle Type</Text>
            <Text style={styles.sectionSubtitle}>
              Choose the category of your vehicle
            </Text>

            <View style={styles.vehicleGrid}>
              {vehicleTypes.map((item) => (
                <OptionCard
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  selected={vehicleType === item.label}
                  onPress={() => setVehicleType(item.label)}
                />
              ))}
            </View>
          </View>

          {/* Company and Model */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>3. Vehicle Details</Text>

            <Text style={styles.fieldLabel}>Company / Brand *</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="business-outline" size={20} color={GRAY} />
              <TextInput
                style={styles.input}
                value={company}
                onChangeText={setCompany}
                placeholder="e.g. Tata, Honda, Hero, TVS"
                placeholderTextColor="#999999"
                autoCapitalize="words"
              />
            </View>

            <Text style={styles.fieldLabel}>Vehicle Model (Optional)</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="car-outline" size={20} color={GRAY} />
              <TextInput
                style={styles.input}
                value={model}
                onChangeText={setModel}
                placeholder="e.g. Nexon EV, Activa, Splendor"
                placeholderTextColor="#999999"
              />
            </View>
          </View>

          {/* Issue Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>4. What is the problem?</Text>
            <Text style={styles.sectionSubtitle}>
              Select the issue you are experiencing
            </Text>

            <View style={styles.issueGrid}>
              {issueTypes.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.issueCard,
                    issue === item.label && styles.issueSelected,
                  ]}
                  onPress={() => setIssue(item.label)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={item.icon}
                    size={23}
                    color={issue === item.label ? RED : GRAY}
                  />
                  <Text
                    style={[
                      styles.issueText,
                      issue === item.label && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>5. Your Location</Text>
            <Text style={styles.sectionSubtitle}>
              Enter a nearby landmark or your current address
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons name="location-outline" size={21} color={RED} />
              <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Street, area, landmark..."
                placeholderTextColor="#999999"
              />
            </View>

            <TouchableOpacity
              style={styles.locationHint}
              onPress={() =>
                Alert.alert(
                  "Location",
                  "Automatic GPS location is not connected yet. Please enter your location manually."
                )
              }
            >
              <Ionicons name="navigate-outline" size={17} color={RED} />
              <Text style={styles.locationHintText}>
                Use current location (GPS setup required)
              </Text>
            </TouchableOpacity>
          </View>

          {/* Additional Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Details</Text>

            <View style={[styles.inputContainer, styles.descriptionContainer]}>
              <TextInput
                style={styles.descriptionInput}
                value={description}
                onChangeText={setDescription}
                placeholder="Describe the problem or add useful details..."
                placeholderTextColor="#999999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={300}
              />
            </View>
            <Text style={styles.characterCount}>
              {description.length}/300
            </Text>
          </View>

          {/* Request Button */}
          <TouchableOpacity
            style={[styles.requestButton, loading && styles.disabledButton]}
            onPress={requestHelp}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color={WHITE} />
            ) : (
              <>
                <Ionicons name="alert-circle" size={23} color={WHITE} />
                <Text style={styles.requestButtonText}>
                  REQUEST SOS ASSISTANCE
                </Text>
                <Ionicons name="arrow-forward" size={20} color={WHITE} />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.disclaimer}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={GRAY}
            />
            <Text style={styles.disclaimerText}>
              Demo screen only. This request does not contact a mechanic or
              share your location. For immediate danger or injury, contact
              your local emergency services.
            </Text>
          </View>
        </View>
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
    paddingTop: 20,
    paddingBottom: 25,
    paddingHorizontal: 18,
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
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    color: WHITE,
    fontSize: 21,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#F5DADA",
    fontSize: 11,
    marginTop: 5,
  },
  headerIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 19,
    paddingTop: 20,
    paddingBottom: 35,
  },
  banner: {
    backgroundColor: LIGHT_RED,
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F3D6D6",
  },
  bannerIcon: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    flex: 1,
    marginLeft: 12,
  },
  bannerTitle: {
    color: RED,
    fontSize: 14,
    fontWeight: "800",
  },
  bannerDescription: {
    color: "#674949",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
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
    gap: 11,
  },
  vehicleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionCard: {
    flex: 1,
    minHeight: 84,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 7,
    position: "relative",
  },
  optionSelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
    borderWidth: 1.5,
  },
  optionText: {
    color: DARK,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  optionTextSelected: {
    color: RED,
    fontWeight: "800",
  },
  checkIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  fieldLabel: {
    color: DARK,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 12,
  },
  inputContainer: {
    minHeight: 51,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 13,
    paddingHorizontal: 13,
  },
  input: {
    flex: 1,
    color: DARK,
    fontSize: 13,
    marginLeft: 10,
    paddingVertical: 12,
  },
  issueGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  issueCard: {
    width: "31.5%",
    minHeight: 91,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  issueSelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
    borderWidth: 1.5,
  },
  issueText: {
    color: DARK,
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },
  locationHint: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 12,
    paddingVertical: 4,
  },
  locationHintText: {
    color: RED,
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 6,
  },
  descriptionContainer: {
    paddingVertical: 8,
    minHeight: 100,
    alignItems: "flex-start",
  },
  descriptionInput: {
    flex: 1,
    width: "100%",
    minHeight: 80,
    color: DARK,
    fontSize: 13,
    paddingTop: 7,
  },
  characterCount: {
    color: GRAY,
    fontSize: 10,
    textAlign: "right",
    marginTop: 5,
  },
  requestButton: {
    backgroundColor: RED,
    borderRadius: 15,
    paddingVertical: 17,
    paddingHorizontal: 15,
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 9,
    elevation: 3,
  },
  requestButtonText: {
    flex: 1,
    color: WHITE,
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 17,
    gap: 8,
    paddingHorizontal: 3,
  },
  disclaimerText: {
    flex: 1,
    color: GRAY,
    fontSize: 10,
    lineHeight: 16,
  },
});
