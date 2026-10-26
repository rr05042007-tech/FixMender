```tsx
// app/garages/index.tsx

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

type Garage = {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  reviews: number;
  price: string;
  open: boolean;
  services: string[];
  icon: keyof typeof Ionicons.glyphMap;
};

const GARAGES: Garage[] = [
  {
    id: "1",
    name: "AutoCare Service Center",
    category: "Multi-brand Garage",
    distance: "1.2 km",
    rating: 4.8,
    reviews: 124,
    price: "₹299 onwards",
    open: true,
    services: ["Car", "Bike", "Engine Repair"],
    icon: "car-sport-outline",
  },
  {
    id: "2",
    name: "QuickFix Motors",
    category: "Bike & Scooty Specialist",
    distance: "2.1 km",
    rating: 4.6,
    reviews: 89,
    price: "₹149 onwards",
    open: true,
    services: ["Bike", "Scooty", "Battery"],
    icon: "bicycle-outline",
  },
  {
    id: "3",
    name: "EV Care Hub",
    category: "Electric Vehicle Specialist",
    distance: "3.4 km",
    rating: 4.9,
    reviews: 67,
    price: "₹399 onwards",
    open: false,
    services: ["Electric Car", "Electric Bike", "EV Battery"],
    icon: "flash-outline",
  },
  {
    id: "4",
    name: "Highway Truck Repairs",
    category: "Heavy Vehicle Service",
    distance: "4.8 km",
    rating: 4.5,
    reviews: 52,
    price: "₹499 onwards",
    open: true,
    services: ["Truck", "Diesel Engine", "Heavy Vehicle"],
    icon: "bus-outline",
  },
  {
    id: "5",
    name: "Royal Auto Workshop",
    category: "Car & Two-Wheeler Garage",
    distance: "5.2 km",
    rating: 4.4,
    reviews: 41,
    price: "₹249 onwards",
    open: true,
    services: ["Car", "Bike", "Tyre Repair"],
    icon: "construct-outline",
  },
];

const FILTERS = [
  "All",
  "Open Now",
  "Top Rated",
  "Electric",
  "Car",
  "Bike",
  "Heavy Vehicle",
];

export default function GaragesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredGarages = useMemo(() => {
    return GARAGES.filter((garage) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        garage.name.toLowerCase().includes(searchText) ||
        garage.category.toLowerCase().includes(searchText) ||
        garage.services.some((service) =>
          service.toLowerCase().includes(searchText)
        );

      let matchesFilter = true;

      if (activeFilter === "Open Now") {
        matchesFilter = garage.open;
      } else if (activeFilter === "Top Rated") {
        matchesFilter = garage.rating >= 4.7;
      } else if (activeFilter === "Electric") {
        matchesFilter = garage.services.some((service) =>
          service.toLowerCase().includes("electric") ||
          service.toLowerCase().includes("ev")
        );
      } else if (activeFilter === "Car") {
        matchesFilter = garage.services.some((service) =>
          service.toLowerCase().includes("car")
        );
      } else if (activeFilter === "Bike") {
        matchesFilter = garage.services.some((service) =>
          service.toLowerCase().includes("bike") ||
          service.toLowerCase().includes("scooty")
        );
      } else if (activeFilter === "Heavy Vehicle") {
        matchesFilter = garage.services.some((service) =>
          service.toLowerCase().includes("heavy") ||
          service.toLowerCase().includes("truck")
        );
      }

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const openGarage = (garage: Garage) => {
    router.push({
      pathname: "/garage-details",
      params: {
        id: garage.id,
        name: garage.name,
        category: garage.category,
        distance: garage.distance,
        rating: String(garage.rating),
        price: garage.price,
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
          <Text style={styles.headerTitle}>Nearby Garages</Text>
          <Text style={styles.headerSubtitle}>
            Find the right service for your vehicle
          </Text>
        </View>

        <View style={styles.headerIcon}>
          <Ionicons name="location-outline" size={25} color="#FFFFFF" />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={21} color={MUTED} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search garage or service..."
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

        {/* Location card */}
        <View style={styles.locationCard}>
          <View style={styles.locationIcon}>
            <Ionicons name="navigate" size={21} color={RED} />
          </View>

          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>YOUR LOCATION</Text>
            <Text style={styles.locationText}>
              Choose your service location
            </Text>
          </View>

          <TouchableOpacity
            style={styles.changeButton}
            onPress={() =>
              router.push({
                pathname: "/sos/location",
                params: { returnTo: "/garages" },
              })
            }
          >
            <Text style={styles.changeButtonText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Filter chips */}
        <Text style={styles.sectionTitle}>Find your garage</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {FILTERS.map((filter) => {
            const selected = activeFilter === filter;

            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  selected && styles.filterChipActive,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                {filter === "Open Now" && (
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={selected ? "#FFFFFF" : RED}
                  />
                )}
                {filter === "Top Rated" && (
                  <Ionicons
                    name="star"
                    size={13}
                    color={selected ? "#FFFFFF" : RED}
                  />
                )}
                <Text
                  style={[
                    styles.filterText,
                    selected && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Results */}
        <View style={styles.resultsHeader}>
          <View>
            <Text style={styles.sectionTitle}>Available garages</Text>
            <Text style={styles.resultsSubtitle}>
              {filteredGarages.length} garage
              {filteredGarages.length === 1 ? "" : "s"} found
            </Text>
          </View>

          <View style={styles.sortLabel}>
            <Ionicons name="swap-vertical-outline" size={16} color={RED} />
            <Text style={styles.sortText}>Recommended</Text>
          </View>
        </View>

        {filteredGarages.map((garage) => (
          <TouchableOpacity
            key={garage.id}
            style={styles.garageCard}
            activeOpacity={0.85}
            onPress={() => openGarage(garage)}
          >
            <View style={styles.garageTop}>
              <View style={styles.garageIcon}>
                <Ionicons name={garage.icon} size={29} color={RED} />
              </View>

              <View style={styles.garageMain}>
                <Text style={styles.garageName}>{garage.name}</Text>
                <Text style={styles.garageCategory}>
                  {garage.category}
                </Text>

                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#F5A623" />
                  <Text style={styles.ratingText}>
                    {garage.rating.toFixed(1)}
                  </Text>
                  <Text style={styles.reviewText}>
                    ({garage.reviews} reviews)
                  </Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999999"
              />
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.garageMeta}>
              <View style={styles.metaItem}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color={MUTED}
                />
                <Text style={styles.metaText}>{garage.distance}</Text>
              </View>

              <View style={styles.metaItem}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: garage.open ? "#239B56" : "#999999" },
                  ]}
                />
                <Text
                  style={[
                    styles.metaText,
                    { color: garage.open ? "#218838" : MUTED },
                  ]}
                >
                  {garage.open ? "Open now" : "Closed"}
                </Text>
              </View>

              <Text style={styles.priceText}>{garage.price}</Text>
            </View>

            <View style={styles.serviceTags}>
              {garage.services.slice(0, 3).map((service) => (
                <View key={service} style={styles.serviceTag}>
                  <Text style={styles.serviceTagText}>{service}</Text>
                </View>
              ))}
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.outlineButton}
                onPress={() => openGarage(garage)}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={17}
                  color={RED}
                />
                <Text style={styles.outlineButtonText}>View details</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() =>
                  router.push({
                    pathname: "/sos",
                    params: {
                      company: garage.name,
                    },
                  })
                }
              >
                <Ionicons
                  name="construct-outline"
                  size={16}
                  color="#FFFFFF"
                />
                <Text style={styles.primaryButtonText}>Request service</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {filteredGarages.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={46} color="#BBBBBB" />
            <Text style={styles.emptyTitle}>No garages found</Text>
            <Text style={styles.emptyDescription}>
              Try another search or choose a different filter.
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => {
                setSearch("");
                setActiveFilter("All");
              }}
            >
              <Text style={styles.resetButtonText}>Reset filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SOS card */}
        <TouchableOpacity
          style={styles.sosCard}
          onPress={() => router.push("/sos")}
          activeOpacity={0.9}
        >
          <View style={styles.sosIcon}>
            <Ionicons name="warning-outline" size={25} color="#FFFFFF" />
          </View>
          <View style={styles.sosTextContainer}>
            <Text style={styles.sosTitle}>Vehicle breakdown?</Text>
            <Text style={styles.sosDescription}>
              Request roadside assistance with FixMender SOS.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={21} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Garage listings, distances, ratings and prices are sample data.
          Verify availability and pricing before booking.
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
    paddingTop: 18,
    paddingBottom: 23,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#F6DADA",
    marginTop: 4,
  },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 35,
  },
  searchBox: {
    minHeight: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    color: TEXT,
    fontSize: 14,
    paddingVertical: 12,
  },
  locationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0E1E1",
    marginBottom: 23,
  },
  locationIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  locationInfo: {
    flex: 1,
    marginLeft: 11,
  },
  locationLabel: {
    fontSize: 10,
    color: MUTED,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  locationText: {
    fontSize: 13,
    fontWeight: "600",
    color: TEXT,
    marginTop: 5,
  },
  changeButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  changeButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: RED,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: TEXT,
  },
  filters: {
    gap: 8,
    paddingVertical: 13,
    paddingRight: 5,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: "#E7D1D1",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  filterChipActive: {
    backgroundColor: RED,
    borderColor: RED,
  },
  filterText: {
    color: TEXT,
    fontSize: 12,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 13,
  },
  resultsSubtitle: {
    fontSize: 12,
    color: MUTED,
    marginTop: 4,
  },
  sortLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sortText: {
    color: RED,
    fontSize: 11,
    fontWeight: "700",
  },
  garageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  garageTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  garageIcon: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  garageMain: {
    flex: 1,
    marginLeft: 12,
    marginRight: 7,
  },
  garageName: {
    fontSize: 15,
    fontWeight: "800",
    color: TEXT,
  },
  garageCategory: {
    fontSize: 11,
    color: MUTED,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 7,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "800",
    color: TEXT,
  },
  reviewText: {
    fontSize: 11,
    color: MUTED,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 13,
  },
  garageMeta: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 13,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: MUTED,
    fontWeight: "600",
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  priceText: {
    marginLeft: "auto",
    fontSize: 11,
    color: RED,
    fontWeight: "800",
  },
  serviceTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 13,
  },
  serviceTag: {
    backgroundColor: "#F5F5F5",
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  serviceTagText: {
    color: "#555555",
    fontSize: 10,
    fontWeight: "600",
  },
  cardActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 15,
  },
  outlineButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: RED,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 6,
  },
  outlineButtonText: {
    color: RED,
    fontSize: 11,
    fontWeight: "800",
  },
  primaryButton: {
    flex: 1.25,
    minHeight: 42,
    borderRadius: 11,
    backgroundColor: RED,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 28,
    borderRadius: 18,
    marginTop: 5,
    marginBottom: 16,
  },
  emptyTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 13,
  },
  emptyDescription: {
    color: MUTED,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 7,
  },
  resetButton: {
    marginTop: 16,
    backgroundColor: LIGHT_RED,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  resetButtonText: {
    color: RED,
    fontSize: 13,
    fontWeight: "800",
  },
  sosCard: {
    backgroundColor: RED,
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  sosIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.17)",
    alignItems: "center",
    justifyContent: "center",
  },
  sosTextContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  sosTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  sosDescription: {
    color: "#F8DEDE",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  disclaimer: {
    color: MUTED,
    fontSize: 10,
    textAlign: "center",
    lineHeight: 16,
    marginTop: 18,
    paddingHorizontal: 10,
  },
});
```