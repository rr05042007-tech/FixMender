```tsx
// app/vehicle/index.tsx

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const RED = "#8B0000";
const LIGHT_RED = "#FFF0F0";
const BG = "#F7F7F7";
const TEXT = "#202020";
const MUTED = "#777777";

type Vehicle = {
  id: string;
  name: string;
  type: string;
  power: "Electric" | "Non-Electric";
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
  examples: string;
};

const VEHICLES: Vehicle[] = [
  {
    id: "electric-bike",
    name: "Electric Bike",
    type: "2-Wheeler",
    power: "Electric",
    icon: "bicycle-outline",
    description: "Electric two-wheelers",
    examples: "E-bikes and electric motorcycles",
  },
  {
    id: "petrol-bike",
    name: "Petrol Bike",
    type: "2-Wheeler",
    power: "Non-Electric",
    icon: "bicycle-outline",
    description: "Petrol-powered motorcycles",
    examples: "Commuter and sports bikes",
  },
  {
    id: "electric-scooty",
    name: "Electric Scooty",
    type: "2-Wheeler",
    power: "Electric",
    icon: "flash-outline",
    description: "Electric scooters",
    examples: "Electric scooters and mopeds",
  },
  {
    id: "petrol-scooty",
    name: "Petrol Scooty",
    type: "2-Wheeler",
    power: "Non-Electric",
    icon: "bicycle-outline",
    description: "Petrol-powered scooters",
    examples: "Scooters and mopeds",
  },
  {
    id: "electric-rickshaw",
    name: "Electric Rickshaw",
    type: "3-Wheeler",
    power: "Electric",
    icon: "car-outline",
    description: "Electric three-wheelers",
    examples: "Passenger and cargo e-rickshaws",
  },
  {
    id: "electric-car",
    name: "Electric Car",
    type: "4-Wheeler",
    power: "Electric",
    icon: "car-sport-outline",
    description: "Electric passenger vehicles",
    examples: "Electric hatchbacks and SUVs",
  },
  {
    id: "petrol-car",
    name: "Petrol Car",
    type: "4-Wheeler",
    power: "Non-Electric",
    icon: "car-sport-outline",
    description: "Petrol-powered cars",
    examples: "Hatchbacks, sedans and SUVs",
  },
  {
    id: "diesel-car",
    name: "Diesel Car",
    type: "4-Wheeler",
    power: "Non-Electric",
    icon: "car-outline",
    description: "Diesel-powered cars",
    examples: "Sedans, SUVs and utility vehicles",
  },
  {
    id: "truck",
    name: "Truck",
    type: "Heavy Vehicle",
    power: "Non-Electric",
    icon: "bus-outline",
    description: "Commercial transport vehicles",
    examples: "Light, medium and heavy trucks",
  },
  {
    id: "heavy-vehicle",
    name: "Heavy Vehicle",
    type: "Heavy Vehicle",
    power: "Non-Electric",
    icon: "construct-outline",
    description: "Heavy-duty vehicles",
    examples: "Buses and commercial machinery",
  },
];

const CATEGORIES = [
  "All",
  "2-Wheeler",
  "3-Wheeler",
  "4-Wheeler",
  "Heavy Vehicle",
];

export default function VehicleScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [power, setPower] = useState<"All" | "Electric" | "Non-Electric">(
    "All"
  );

  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return VEHICLES.filter((vehicle) => {
      const matchesSearch =
        !query ||
        vehicle.name.toLowerCase().includes(query) ||
        vehicle.type.toLowerCase().includes(query) ||
        vehicle.description.toLowerCase().includes(query) ||
        vehicle.examples.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || vehicle.type === category;

      const matchesPower = power === "All" || vehicle.power === power;

      return matchesSearch && matchesCategory && matchesPower;
    });
  }, [search, category, power]);

  const selectVehicle = (vehicle: Vehicle) => {
    router.push({
      pathname: "/sos/vehicle-details",
      params: {
        vehicleType: vehicle.type,
        powerType: vehicle.power,
        vehicleName: vehicle.name,
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
          <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>My Vehicle</Text>
          <Text style={styles.headerSubtitle}>
            Choose a vehicle for service
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="car-sport-outline" size={25} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Intro */}
        <View style={styles.introCard}>
          <View style={styles.introTextContainer}>
            <Text style={styles.introTitle}>Which vehicle needs help?</Text>
            <Text style={styles.introDescription}>
              Select your vehicle type to find suitable repair services.
            </Text>
          </View>
          <View style={styles.introIcon}>
            <Ionicons name="construct-outline" size={33} color={RED} />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={21} color={MUTED} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vehicle type or model..."
            placeholderTextColor="#999999"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={20} color={MUTED} />
            </TouchableOpacity>
          )}
        </View>

        {/* Power filter */}
        <Text style={styles.sectionTitle}>Vehicle power type</Text>
        <View style={styles.powerRow}>
          {[
            { label: "All vehicles", value: "All", icon: "apps-outline" },
            { label: "Electric", value: "Electric", icon: "flash-outline" },
            {
              label: "Non-Electric",
              value: "Non-Electric",
              icon: "water-outline",
            },
          ].map((item) => {
            const selected = power === item.value;

            return (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.powerButton,
                  selected && styles.powerButtonActive,
                ]}
                onPress={() =>
                  setPower(
                    item.value as "All" | "Electric" | "Non-Electric"
                  )
                }
              >
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={17}
                  color={selected ? "#FFFFFF" : RED}
                />
                <Text
                  style={[
                    styles.powerButtonText,
                    selected && styles.powerButtonTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Category filter */}
        <Text style={styles.sectionTitle}>Vehicle category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {CATEGORIES.map((item) => {
            const selected = category === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryChip,
                  selected && styles.categoryChipActive,
                ]}
                onPress={() => setCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    selected && styles.categoryChipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Vehicle list */}
        <View style={styles.listHeader}>
          <View>
            <Text style={styles.sectionTitle}>Select your vehicle</Text>
            <Text style={styles.resultCount}>
              {filteredVehicles.length} options available
            </Text>
          </View>
          <Ionicons name="grid-outline" size={21} color={RED} />
        </View>

        <View style={styles.vehicleGrid}>
          {filteredVehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              style={styles.vehicleCard}
              activeOpacity={0.85}
              onPress={() => selectVehicle(vehicle)}
            >
              <View style={styles.vehicleCardTop}>
                <View style={styles.vehicleIcon}>
                  <Ionicons name={vehicle.icon} size={31} color={RED} />
                </View>
                <Ionicons
                  name="chevron-forward-circle-outline"
                  size={23}
                  color={RED}
                />
              </View>

              <Text style={styles.vehicleName}>{vehicle.name}</Text>
              <Text style={styles.vehicleDescription}>
                {vehicle.description}
              </Text>

              <View style={styles.vehicleFooter}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{vehicle.type}</Text>
                </View>
                <View
                  style={[
                    styles.powerBadge,
                    vehicle.power === "Electric" && styles.electricBadge,
                  ]}
                >
                  <Ionicons
                    name={
                      vehicle.power === "Electric"
                        ? "flash"
                        : "speedometer-outline"
                    }
                    size={11}
                    color={vehicle.power === "Electric" ? "#197644" : "#666666"}
                  />
                  <Text
                    style={[
                      styles.powerBadgeText,
                      vehicle.power === "Electric" &&
                        styles.electricBadgeText,
                    ]}
                  >
                    {vehicle.power === "Electric" ? "EV" : "Fuel"}
                  </Text>
                </View>
              </View>

              <View style={styles.chooseRow}>
                <Text style={styles.chooseText}>Select vehicle</Text>
                <Ionicons name="arrow-forward" size={14} color={RED} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredVehicles.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="car-outline" size={48} color="#BBBBBB" />
            <Text style={styles.emptyTitle}>No vehicles found</Text>
            <Text style={styles.emptyText}>
              Try a different search or reset your filters.
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setSearch("");
                setCategory("All");
                setPower("All");
              }}
            >
              <Text style={styles.resetButtonText}>Reset filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Help */}
        <View style={styles.helpCard}>
          <View style={styles.helpIcon}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={RED}
            />
          </View>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Need roadside assistance?</Text>
            <Text style={styles.helpDescription}>
              Choose your vehicle and continue to report a problem.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/sos")}
            accessibilityLabel="Open SOS assistance"
          >
            <Ionicons name="chevron-forward" size={22} color={RED} />
          </TouchableOpacity>
        </View>

        <Text style={styles.disclaimer}>
          Vehicle selection helps tailor your repair request. Available
          services depend on the selected garage and vehicle.
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
    paddingHorizontal: 17,
    paddingTop: 15,
    paddingBottom: 21,
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
    fontSize: 12,
    marginTop: 4,
  },
  headerIcon: {
    width: 43,
    height: 43,
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
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#F0DEDE",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
  },
  introTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  introTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 23,
  },
  introDescription: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
  },
  introIcon: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    minHeight: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 21,
  },
  searchInput: {
    flex: 1,
    color: TEXT,
    fontSize: 13,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "800",
  },
  powerRow: {
    flexDirection: "row",
    gap: 7,
    marginTop: 12,
    marginBottom: 22,
  },
  powerButton: {
    flex: 1,
    minHeight: 43,
    paddingHorizontal: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E7D1D1",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  powerButtonActive: {
    backgroundColor: RED,
    borderColor: RED,
  },
  powerButtonText: {
    color: TEXT,
    fontSize: 10,
    fontWeight: "700",
  },
  powerButtonTextActive: {
    color: "#FFFFFF",
  },
  categoryList: {
    gap: 8,
    paddingVertical: 13,
    paddingRight: 5,
  },
  categoryChip: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E7D1D1",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },
  categoryChipActive: {
    backgroundColor: RED,
    borderColor: RED,
  },
  categoryChipText: {
    color: TEXT,
    fontSize: 11,
    fontWeight: "700",
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 14,
  },
  resultCount: {
    color: MUTED,
    fontSize: 11,
    marginTop: 4,
  },
  vehicleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  vehicleCard: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.035,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  vehicleCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  vehicleIcon: {
    width: 54,
    height: 54,
    borderRadius: 15,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleName: {
    color: TEXT,
    fontSize: 14,
    fontWeight: "800",
    minHeight: 36,
    lineHeight: 19,
  },
  vehicleDescription: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 16,
    minHeight: 32,
    marginTop: 5,
  },
  vehicleFooter: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 5,
    marginTop: 11,
  },
  typeBadge: {
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 7,
  },
  typeBadgeText: {
    color: "#555555",
    fontSize: 9,
    fontWeight: "700",
  },
  powerBadge: {
    backgroundColor: "#EEEEEE",
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  electricBadge: {
    backgroundColor: "#E5F6EC",
  },
  powerBadgeText: {
    color: "#666666",
    fontSize: 9,
    fontWeight: "800",
  },
  electricBadgeText: {
    color: "#197644",
  },
  chooseRow: {
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    marginTop: 13,
    paddingTop: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chooseText: {
    color: RED,
    fontSize: 11,
    fontWeight: "800",
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 25,
    marginBottom: 16,
  },
  emptyTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 12,
  },
  emptyText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 7,
  },
  resetButton: {
    backgroundColor: LIGHT_RED,
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 14,
  },
  resetButtonText: {
    color: RED,
    fontWeight: "800",
    fontSize: 12,
  },
  helpCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#F0DEDE",
    padding: 13,
    marginTop: 21,
    flexDirection: "row",
    alignItems: "center",
  },
  helpIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  helpContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  helpTitle: {
    color: TEXT,
    fontSize: 12,
    fontWeight: "800",
  },
  helpDescription: {
    color: MUTED,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  disclaimer: {
    color: MUTED,
    fontSize: 10,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 17,
    paddingHorizontal: 8,
  },
});
```