
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
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

type VehicleCategory = {
  label: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  category: string;
};

const vehicleCategories: VehicleCategory[] = [
  {
    label: "2-Wheeler",
    subtitle: "Bikes & Scooters",
    icon: "bicycle-outline",
    category: "2-Wheeler",
  },
  {
    label: "3-Wheeler",
    subtitle: "Auto & E-Rickshaw",
    icon: "car-outline",
    category: "3-Wheeler",
  },
  {
    label: "4-Wheeler",
    subtitle: "Cars & SUVs",
    icon: "car-sport-outline",
    category: "4-Wheeler",
  },
  {
    label: "Heavy Vehicle",
    subtitle: "Trucks & Buses",
    icon: "bus-outline",
    category: "Heavy Vehicle",
  },
];

export default function VehicleTypeScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    vehicleType?: string;
    powerType?: string;
    company?: string;
    model?: string;
  }>();

  const [selectedCategory, setSelectedCategory] = useState(
    params.vehicleType ?? ""
  );

  const [selectedPower, setSelectedPower] = useState(
    params.powerType ?? ""
  );

  const handleContinue = () => {
    if (!selectedCategory || !selectedPower) {
      return;
    }

    router.push({
      pathname: "/sos/vehicle-details",
      params: {
        vehicleType: selectedCategory,
        powerType: selectedPower,
        company: params.company ?? "",
        model: params.model ?? "",
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={RED} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={23} color={WHITE} />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Select Vehicle Type</Text>
          <Text style={styles.headerSubtitle}>
            Get the right roadside assistance
          </Text>
        </View>

        <Ionicons name="car-sport-outline" size={30} color={WHITE} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressItem}>
            <View style={styles.activeStep}>
              <Text style={styles.activeStepNumber}>1</Text>
            </View>
            <Text style={styles.activeStepLabel}>Vehicle Type</Text>
          </View>

          <View style={styles.progressLine} />

          <View style={styles.progressItem}>
            <View style={styles.inactiveStep}>
              <Text style={styles.inactiveNumber}>2</Text>
            </View>
            <Text style={styles.inactiveLabel}>Details</Text>
          </View>

          <View style={styles.progressLine} />

          <View style={styles.progressItem}>
            <View style={styles.inactiveStep}>
              <Text style={styles.inactiveNumber}>3</Text>
            </View>
            <Text style={styles.inactiveLabel}>Problem</Text>
          </View>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.heading}>What do you drive?</Text>
          <Text style={styles.description}>
            Select your vehicle category so we can guide you to the right
            mechanic.
          </Text>
        </View>

        {/* Vehicle Categories */}
        <View style={styles.vehicleGrid}>
          {vehicleCategories.map((vehicle) => {
            const selected = selectedCategory === vehicle.category;

            return (
              <TouchableOpacity
                key={vehicle.category}
                style={[
                  styles.vehicleCard,
                  selected && styles.vehicleCardSelected,
                ]}
                onPress={() => setSelectedCategory(vehicle.category)}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.vehicleIcon,
                    selected && styles.vehicleIconSelected,
                  ]}
                >
                  <Ionicons
                    name={vehicle.icon}
                    size={34}
                    color={selected ? RED : GRAY}
                  />
                </View>

                <Text
                  style={[
                    styles.vehicleTitle,
                    selected && styles.selectedText,
                  ]}
                >
                  {vehicle.label}
                </Text>

                <Text style={styles.vehicleSubtitle}>
                  {vehicle.subtitle}
                </Text>

                {selected && (
                  <View style={styles.checkmark}>
                    <Ionicons
                      name="checkmark-circle"
                      size={22}
                      color={RED}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Power Type */}
        <View style={styles.powerSection}>
          <Text style={styles.sectionTitle}>Power Type</Text>
          <Text style={styles.sectionSubtitle}>
            Is your vehicle electric or fuel-powered?
          </Text>

          <View style={styles.powerOptions}>
            <TouchableOpacity
              style={[
                styles.powerCard,
                selectedPower === "Electric" && styles.powerCardSelected,
              ]}
              onPress={() => setSelectedPower("Electric")}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.powerIcon,
                  selectedPower === "Electric" && styles.powerIconSelected,
                ]}
              >
                <Ionicons
                  name="flash"
                  size={25}
                  color={selectedPower === "Electric" ? RED : GRAY}
                />
              </View>

              <View style={styles.powerTextContainer}>
                <Text
                  style={[
                    styles.powerTitle,
                    selectedPower === "Electric" && styles.selectedText,
                  ]}
                >
                  Electric
                </Text>
                <Text style={styles.powerSubtitle}>
                  EV, e-bike, e-scooter
                </Text>
              </View>

              <Ionicons
                name={
                  selectedPower === "Electric"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={22}
                color={selectedPower === "Electric" ? RED : GRAY}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.powerCard,
                selectedPower === "Non-Electric" && styles.powerCardSelected,
              ]}
              onPress={() => setSelectedPower("Non-Electric")}
              activeOpacity={0.85}
            >
              <View
                style={[
                  styles.powerIcon,
                  selectedPower === "Non-Electric" &&
                    styles.powerIconSelected,
                ]}
              >
                <Ionicons
                  name="water-outline"
                  size={25}
                  color={selectedPower === "Non-Electric" ? RED : GRAY}
                />
              </View>

              <View style={styles.powerTextContainer}>
                <Text
                  style={[
                    styles.powerTitle,
                    selectedPower === "Non-Electric" && styles.selectedText,
                  ]}
                >
                  Non-Electric
                </Text>
                <Text style={styles.powerSubtitle}>
                  Petrol, diesel, CNG
                </Text>
              </View>

              <Ionicons
                name={
                  selectedPower === "Non-Electric"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={22}
                color={selectedPower === "Non-Electric" ? RED : GRAY}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Selected Summary */}
        {selectedCategory && selectedPower ? (
          <View style={styles.summaryCard}>
            <Ionicons
              name="checkmark-circle"
              size={22}
              color={RED}
            />
            <View style={styles.summaryText}>
              <Text style={styles.summaryTitle}>Your Selection</Text>
              <Text style={styles.summaryDescription}>
                {selectedCategory} • {selectedPower}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Continue */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!selectedCategory || !selectedPower) &&
              styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedCategory || !selectedPower}
          activeOpacity={0.85}
        >
          <Text style={styles.continueText}>Continue to Vehicle Details</Text>
          <Ionicons name="arrow-forward" size={21} color={WHITE} />
        </TouchableOpacity>

        <Text style={styles.footerText}>
          FixMender helps you find roadside repair assistance for your vehicle.
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
    fontSize: 19,
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
    minWidth: 57,
  },
  activeStep: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
  },
  activeStepNumber: {
    color: WHITE,
    fontSize: 13,
    fontWeight: "800",
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
  activeStepLabel: {
    color: RED,
    fontSize: 10,
    fontWeight: "800",
    marginTop: 6,
  },
  inactiveLabel: {
    color: GRAY,
    fontSize: 10,
    marginTop: 6,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: BORDER,
    marginHorizontal: 5,
    marginBottom: 17,
  },
  intro: {
    marginTop: 25,
    marginBottom: 18,
  },
  heading: {
    color: DARK,
    fontSize: 23,
    fontWeight: "800",
  },
  description: {
    color: GRAY,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
  vehicleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  vehicleCard: {
    width: "47.5%",
    minHeight: 145,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    position: "relative",
  },
  vehicleCardSelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
    borderWidth: 1.5,
  },
  vehicleIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleIconSelected: {
    backgroundColor: "#FFE0E0",
  },
  vehicleTitle: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 10,
  },
  vehicleSubtitle: {
    color: GRAY,
    fontSize: 11,
    marginTop: 4,
    textAlign: "center",
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  powerSection: {
    marginTop: 27,
  },
  sectionTitle: {
    color: DARK,
    fontSize: 17,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: GRAY,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 13,
  },
  powerOptions: {
    gap: 11,
  },
  powerCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 15,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
  },
  powerCardSelected: {
    backgroundColor: LIGHT_RED,
    borderColor: RED,
    borderWidth: 1.5,
  },
  powerIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center",
  },
  powerIconSelected: {
    backgroundColor: "#FFE0E0",
  },
  powerTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  powerTitle: {
    color: DARK,
    fontSize: 13,
    fontWeight: "800",
  },
  powerSubtitle: {
    color: GRAY,
    fontSize: 11,
    marginTop: 5,
  },
  selectedText: {
    color: RED,
  },
  summaryCard: {
    backgroundColor: LIGHT_RED,
    borderRadius: 14,
    padding: 14,
    marginTop: 23,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  summaryText: {
    flex: 1,
  },
  summaryTitle: {
    color: RED,
    fontSize: 12,
    fontWeight: "800",
  },
  summaryDescription: {
    color: DARK,
    fontSize: 12,
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: RED,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  continueButtonDisabled: {
    backgroundColor: "#BDA0A0",
  },
  continueText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: "800",
    flex: 1,
    textAlign: "center",
  },
  footerText: {
    color: GRAY,
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 13,
  },
});
