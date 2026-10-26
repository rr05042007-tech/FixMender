
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

const problems = [
  { label: "Engine Problem", icon: "construct-outline" as const },
  { label: "Battery Issue", icon: "battery-dead-outline" as const },
  { label: "Flat Tyre", icon: "disc-outline" as const },
  { label: "Vehicle Not Starting", icon: "power-outline" as const },
  { label: "Brake Problem", icon: "alert-circle-outline" as const },
  { label: "Overheating", icon: "thermometer-outline" as const },
  { label: "Electrical Issue", icon: "flash-outline" as const },
  { label: "Accident / Damage", icon: "warning-outline" as const },
  { label: "Other", icon: "ellipsis-horizontal-circle-outline" as const },
];

export default function ProblemDetailsScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    vehicleType?: string;
    powerType?: string;
    company?: string;
    model?: string;
    issue?: string;
    description?: string;
    location?: string;
    locationType?: string;
    saveAddress?: string;
  }>();

  const [selectedProblem, setSelectedProblem] = useState(params.issue ?? "");
  const [description, setDescription] = useState(params.description ?? "");
  const [isVehicleMovable, setIsVehicleMovable] = useState("");
  const [urgency, setUrgency] = useState("Urgent");
  const [additionalHelp, setAdditionalHelp] = useState(false);

  const continueToLocation = () => {
    if (!selectedProblem) {
      Alert.alert(
        "Select a Problem",
        "Please select the problem your vehicle is experiencing."
      );
      return;
    }

    router.push({
      pathname: "/sos/location",
      params: {
        vehicleType: params.vehicleType ?? "",
        powerType: params.powerType ?? "",
        company: params.company ?? "",
        model: params.model ?? "",
        issue: selectedProblem,
        description,
        urgency,
        isVehicleMovable,
        additionalHelp: String(additionalHelp),
      },
    });
  };

  const ProblemCard = ({
    label,
    icon,
  }: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
  }) => {
    const selected = selectedProblem === label;

    return (
      <TouchableOpacity
        style={[styles.problemCard, selected && styles.problemSelected]}
        onPress={() => setSelectedProblem(label)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={icon}
          size={25}
          color={selected ? RED : GRAY}
        />

        <Text
          style={[
            styles.problemLabel,
            selected && styles.problemLabelSelected,
          ]}
        >
          {label}
        </Text>

        {selected && (
          <Ionicons
            name="checkmark-circle"
            size={17}
            color={RED}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.headerTitle}>Problem Details</Text>
          <Text style={styles.headerSubtitle}>
            Tell us what happened to your vehicle
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="construct-outline" size={26} color={WHITE} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* Step Indicator */}
        <View style={styles.stepCard}>
          <View style={styles.stepItem}>
            <View style={styles.completedStep}>
              <Ionicons name="checkmark" size={16} color={WHITE} />
            </View>
            <Text style={styles.completedStepText}>Vehicle</Text>
          </View>

          <View style={styles.stepLine} />

          <View style={styles.stepItem}>
            <View style={styles.activeStep}>
              <Text style={styles.activeStepNumber}>2</Text>
            </View>
            <Text style={styles.activeStepText}>Problem</Text>
          </View>

          <View style={styles.stepLine} />

          <View style={styles.stepItem}>
            <View style={styles.inactiveStep}>
              <Text style={styles.inactiveStepNumber}>3</Text>
            </View>
            <Text style={styles.inactiveStepText}>Location</Text>
          </View>
        </View>

        {/* Vehicle Summary */}
        <View style={styles.vehicleSummary}>
          <View style={styles.vehicleSummaryIcon}>
            <Ionicons
              name="car-sport-outline"
              size={28}
              color={RED}
            />
          </View>

          <View style={styles.vehicleSummaryText}>
            <Text style={styles.vehicleSummaryTitle}>
              {params.company || "Your Vehicle"}
              {params.model ? ` ${params.model}` : ""}
            </Text>
            <Text style={styles.vehicleSummarySubtitle}>
              {[params.vehicleType, params.powerType]
                .filter(Boolean)
                .join(" • ") || "Vehicle details"}
            </Text>
          </View>

          <Ionicons name="checkmark-circle" size={21} color="#218838" />
        </View>

        {/* Problem Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            What problem are you facing?
          </Text>
          <Text style={styles.sectionSubtitle}>
            Select the issue that best describes your situation.
          </Text>

          <View style={styles.problemGrid}>
            {problems.map((problem) => (
              <ProblemCard
                key={problem.label}
                label={problem.label}
                icon={problem.icon}
              />
            ))}
          </View>
        </View>

        {/* Urgency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How urgent is the issue?</Text>

          <View style={styles.urgencyRow}>
            {[
              { label: "Normal", subtitle: "Can wait", icon: "time-outline" as const },
              { label: "Urgent", subtitle: "Need help soon", icon: "alert-circle-outline" as const },
              { label: "Emergency", subtitle: "Immediate help", icon: "warning-outline" as const },
            ].map((item) => {
              const selected = urgency === item.label;

              return (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.urgencyCard,
                    selected && styles.urgencySelected,
                  ]}
                  onPress={() => setUrgency(item.label)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={selected ? RED : GRAY}
                  />
                  <Text
                    style={[
                      styles.urgencyTitle,
                      selected && styles.problemLabelSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  <Text style={styles.urgencySubtitle}>{item.subtitle}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Vehicle Condition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Can your vehicle still move?
          </Text>

          <View style={styles.conditionRow}>
            {[
              { label: "Yes", icon: "checkmark-circle-outline" as const },
              { label: "No", icon: "close-circle-outline" as const },
              { label: "Not Sure", icon: "help-circle-outline" as const },
            ].map((item) => {
              const selected = isVehicleMovable === item.label;

              return (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.conditionButton,
                    selected && styles.conditionSelected,
                  ]}
                  onPress={() => setIsVehicleMovable(item.label)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={item.icon}
                    size={19}
                    color={selected ? RED : GRAY}
                  />
                  <Text
                    style={[
                      styles.conditionText,
                      selected && styles.problemLabelSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Additional Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Describe the problem</Text>
          <Text style={styles.sectionSubtitle}>
            Add any useful information for the mechanic (optional).
          </Text>

          <View style={styles.descriptionBox}>
            <TextInput
              style={styles.descriptionInput}
              value={description}
              onChangeText={setDescription}
              placeholder="For example: The engine is making a strange noise..."
              placeholderTextColor="#999999"
              multiline
              numberOfLines={5}
              maxLength={400}
              textAlignVertical="top"
            />
          </View>

          <Text style={styles.characterCount}>
            {description.length}/400
          </Text>
        </View>

        {/* Additional Help */}
        <TouchableOpacity
          style={styles.additionalHelpRow}
          onPress={() => setAdditionalHelp(!additionalHelp)}
          activeOpacity={0.8}
        >
          <View style={styles.additionalHelpIcon}>
            <Ionicons name="people-outline" size={22} color={RED} />
          </View>

          <View style={styles.additionalHelpText}>
            <Text style={styles.additionalHelpTitle}>
              I need additional roadside support
            </Text>
            <Text style={styles.additionalHelpSubtitle}>
              Request extra assistance along with vehicle repair.
            </Text>
          </View>

          <Ionicons
            name={additionalHelp ? "checkbox" : "square-outline"}
            size={23}
            color={additionalHelp ? RED : GRAY}
          />
        </TouchableOpacity>

        {/* Safety Notice */}
        <View style={styles.safetyNotice}>
          <Ionicons name="shield-checkmark-outline" size={21} color={RED} />
          <Text style={styles.safetyText}>
            For an accident or immediate danger, move to a safe place if
            possible and contact local emergency services.
          </Text>
        </View>

        {/* Continue */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={continueToLocation}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>
            Continue to Location
          </Text>
          <Ionicons name="arrow-forward" size={21} color={WHITE} />
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Your problem details help identify suitable roadside assistance.
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
  stepCard: {
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepItem: {
    alignItems: "center",
    minWidth: 54,
  },
  completedStep: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
  },
  activeStep: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: LIGHT_RED,
    borderWidth: 1.5,
    borderColor: RED,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveStep: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },
  activeStepNumber: {
    color: RED,
    fontSize: 13,
    fontWeight: "800",
  },
  inactiveStepNumber: {
    color: GRAY,
    fontSize: 13,
    fontWeight: "700",
  },
  completedStepText: {
    color: RED,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 6,
  },
  activeStepText: {
    color: RED,
    fontSize: 10,
    fontWeight: "800",
    marginTop: 6,
  },
  inactiveStepText: {
    color: GRAY,
    fontSize: 10,
    marginTop: 6,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: BORDER,
    marginHorizontal: 7,
    marginBottom: 17,
  },
  vehicleSummary: {
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleSummaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: LIGHT_RED,
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleSummaryText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  vehicleSummaryTitle: {
    color: DARK,
    fontSize: 13,
    fontWeight: "800",
  },
  vehicleSummarySubtitle: {
    color: GRAY,
    fontSize: 11,
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
  problemGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  problemCard: {
    width: "31.5%",
    minHeight: 99,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
    position: "relative",
  },
  problemSelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
    borderWidth: 1.5,
  },
  problemLabel: {
    color: DARK,
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 14,
    marginTop: 8,
  },
  problemLabelSelected: {
    color: RED,
    fontWeight: "800",
  },
  checkIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  urgencyRow: {
    flexDirection: "row",
    gap: 8,
  },
  urgencyCard: {
    flex: 1,
    minHeight: 105,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
  },
  urgencySelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
    borderWidth: 1.5,
  },
  urgencyTitle: {
    color: DARK,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 7,
  },
  urgencySubtitle: {
    color: GRAY,
    fontSize: 9,
    textAlign: "center",
    marginTop: 4,
  },
  conditionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  conditionButton: {
    flex: 1,
    minHeight: 47,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  conditionSelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
  },
  conditionText: {
    color: DARK,
    fontSize: 11,
    fontWeight: "700",
  },
  descriptionBox: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 10,
    minHeight: 120,
  },
  descriptionInput: {
    color: DARK,
    fontSize: 13,
    lineHeight: 19,
    minHeight: 100,
  },
  characterCount: {
    color: GRAY,
    fontSize: 10,
    textAlign: "right",
    marginTop: 5,
  },
  additionalHelpRow: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 15,
    padding: 13,
    marginTop: 23,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  additionalHelpIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  additionalHelpText: {
    flex: 1,
  },
  additionalHelpTitle: {
    color: DARK,
    fontSize: 12,
    fontWeight: "800",
  },
  additionalHelpSubtitle: {
    color: GRAY,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  safetyNotice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    marginTop: 19,
    paddingHorizontal: 3,
  },
  safetyText: {
    color: GRAY,
    fontSize: 10,
    lineHeight: 16,
    flex: 1,
  },
  continueButton: {
    backgroundColor: RED,
    borderRadius: 14,
    paddingHorizontal: 17,
    paddingVertical: 16,
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  continueButtonText: {
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
