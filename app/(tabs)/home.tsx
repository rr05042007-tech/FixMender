
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
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RED = "#8B0000";
const LIGHT_RED = "#FFF0F0";
const WHITE = "#FFFFFF";
const DARK = "#222222";
const GRAY = "#777777";
const BORDER = "#EEEEEE";

const garages = [
  {
    id: "1",
    name: "Sharma Auto Care",
    type: "Car & Bike Repair",
    distance: "1.2 km away",
    rating: "4.8",
    price: "₹299 onwards",
    icon: "car-sport" as const,
  },
  {
    id: "2",
    name: "QuickFix Garage",
    type: "All Vehicle Services",
    distance: "2.4 km away",
    rating: "4.6",
    price: "₹199 onwards",
    icon: "construct" as const,
  },
  {
    id: "3",
    name: "EV Service Point",
    type: "Electric Vehicle Specialist",
    distance: "3.1 km away",
    rating: "4.9",
    price: "₹399 onwards",
    icon: "flash" as const,
  },
];

const serviceTypes = [
  { title: "Car", icon: "car-sport" as const },
  { title: "Bike", icon: "bicycle" as const },
  { title: "Electric", icon: "flash" as const },
  { title: "Heavy Vehicle", icon: "bus" as const },
];

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredGarages = garages.filter((garage) =>
    `${garage.name} ${garage.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openSOS = () => {
    Alert.alert(
      "Emergency Roadside Assistance",
      "Choose the type of vehicle for assistance.",
      [
        {
          text: "2-Wheeler",
          onPress: () =>
            router.push({
              pathname: "/sos",
              params: { vehicleType: "2-Wheeler" },
            }),
        },
        {
          text: "4-Wheeler / Heavy",
          onPress: () =>
            router.push({
              pathname: "/sos",
              params: { vehicleType: "4-Wheeler / Heavy" },
            }),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const openRepairCost = () => {
    router.push("/repair-cost" as never);
  };

  const openGarage = (garageName: string) => {
    router.push({
      pathname: "/garage-details" as never,
      params: { name: garageName },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={RED} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>WELCOME TO</Text>
            <Text style={styles.logo}>
              Fix<Text style={styles.logoLight}>Mender</Text>
            </Text>
            <Text style={styles.headerSubtitle}>
              Your vehicle, our responsibility.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() =>
              Alert.alert("Notifications", "You are all caught up!")
            }
          >
            <Ionicons
              name="notifications-outline"
              size={23}
              color={WHITE}
            />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={21} color={GRAY} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search garages or services..."
            placeholderTextColor={GRAY}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={20} color={GRAY} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.content}>
          {/* SOS Card */}
          <View style={styles.sosCard}>
            <View style={styles.sosTextContainer}>
              <Text style={styles.sosTitle}>Vehicle Trouble?</Text>
              <Text style={styles.sosDescription}>
                Get roadside help wherever you are.
              </Text>

              <TouchableOpacity
                style={styles.sosButton}
                onPress={openSOS}
                activeOpacity={0.85}
              >
                <Ionicons name="alert-circle" size={20} color={RED} />
                <Text style={styles.sosButtonText}>GET SOS HELP</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sosIconCircle}>
              <Ionicons name="car-sport" size={48} color={WHITE} />
              <View style={styles.sosSmallCircle}>
                <Ionicons name="flash" size={17} color={RED} />
              </View>
            </View>
          </View>

          {/* Vehicle Categories */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Your Vehicle</Text>
          </View>

          <View style={styles.vehicleGrid}>
            {serviceTypes.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.title}
                style={styles.vehicleCard}
                onPress={() =>
                  router.push({
                    pathname: "/sos",
                    params: { vehicleType: vehicle.title },
                  })
                }
                activeOpacity={0.8}
              >
                <View style={styles.vehicleIcon}>
                  <Ionicons name={vehicle.icon} size={27} color={RED} />
                </View>
                <Text style={styles.vehicleTitle}>{vehicle.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Repair Cost */}
          <TouchableOpacity
            style={styles.costCard}
            onPress={openRepairCost}
            activeOpacity={0.85}
          >
            <View style={styles.costIcon}>
              <Ionicons name="calculator-outline" size={28} color={RED} />
            </View>

            <View style={styles.costTextContainer}>
              <Text style={styles.costTitle}>Repair Cost Estimator</Text>
              <Text style={styles.costSubtitle}>
                Get an estimated service cost for your vehicle.
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={23} color={RED} />
          </TouchableOpacity>

          {/* Nearby Garages */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Nearby Garages</Text>
              <Text style={styles.sectionSubtitle}>
                Find help close to you
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/garages" as never)}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {filteredGarages.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={30} color={GRAY} />
              <Text style={styles.emptyText}>No garages found.</Text>
            </View>
          ) : (
            filteredGarages.slice(0, 3).map((garage) => (
              <TouchableOpacity
                key={garage.id}
                style={styles.garageCard}
                onPress={() => openGarage(garage.name)}
                activeOpacity={0.85}
              >
                <View style={styles.garageIcon}>
                  <Ionicons name={garage.icon} size={30} color={RED} />
                </View>

                <View style={styles.garageInfo}>
                  <Text style={styles.garageName}>{garage.name}</Text>
                  <Text style={styles.garageType}>{garage.type}</Text>

                  <View style={styles.garageMeta}>
                    <Ionicons name="location-outline" size={14} color={GRAY} />
                    <Text style={styles.metaText}>{garage.distance}</Text>
                    <Ionicons
                      name="star"
                      size={14}
                      color="#F5A623"
                      style={styles.starIcon}
                    />
                    <Text style={styles.rating}>{garage.rating}</Text>
                  </View>

                  <Text style={styles.garagePrice}>{garage.price}</Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={GRAY}
                />
              </TouchableOpacity>
            ))
          )}

          {/* Recommended Services */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Recommended Services</Text>
              <Text style={styles.sectionSubtitle}>
                Keep your vehicle running smoothly
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesRow}
          >
            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() =>
                router.push({
                  pathname: "/repair-cost" as never,
                  params: { service: "General Service" },
                })
              }
            >
              <View style={styles.serviceIcon}>
                <Ionicons name="settings-outline" size={27} color={RED} />
              </View>
              <Text style={styles.serviceTitle}>General Service</Text>
              <Text style={styles.serviceSubtitle}>Routine maintenance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() =>
                router.push({
                  pathname: "/repair-cost" as never,
                  params: { service: "Battery Check" },
                })
              }
            >
              <View style={styles.serviceIcon}>
                <Ionicons name="battery-charging-outline" size={27} color={RED} />
              </View>
              <Text style={styles.serviceTitle}>Battery Check</Text>
              <Text style={styles.serviceSubtitle}>Battery diagnostics</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceCard}
              onPress={() =>
                router.push({
                  pathname: "/repair-cost" as never,
                  params: { service: "Tyre Repair" },
                })
              }
            >
              <View style={styles.serviceIcon}>
                <Ionicons name="disc-outline" size={27} color={RED} />
              </View>
              <Text style={styles.serviceTitle}>Tyre Repair</Text>
              <Text style={styles.serviceSubtitle}>Tyre and puncture</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Showrooms */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Vehicle Showrooms</Text>
              <Text style={styles.sectionSubtitle}>
                Explore vehicle service centres
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push("/showrooms" as never)}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.showroomCard}
            onPress={() => router.push("/showrooms" as never)}
            activeOpacity={0.85}
          >
            <View style={styles.showroomIcon}>
              <Ionicons name="business-outline" size={30} color={RED} />
            </View>

            <View style={styles.showroomInfo}>
              <Text style={styles.showroomTitle}>
                Authorized Service Centres
              </Text>
              <Text style={styles.showroomSubtitle}>
                Explore brand service and maintenance options.
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={21} color={RED} />
          </TouchableOpacity>

          {/* Safety Tip */}
          <View style={styles.tipCard}>
            <Ionicons name="shield-checkmark-outline" size={25} color={RED} />
            <View style={styles.tipTextContainer}>
              <Text style={styles.tipTitle}>Safety Tip</Text>
              <Text style={styles.tipDescription}>
                If your vehicle breaks down, move to a safe location and use
                hazard lights when possible.
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          FixMender • Reliable help on the road
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    backgroundColor: RED,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 42,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: "#F5DADA",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
  },
  logo: {
    color: WHITE,
    fontSize: 29,
    fontWeight: "900",
    marginTop: 3,
  },
  logoLight: {
    color: "#FFDADA",
  },
  headerSubtitle: {
    color: "#F5DADA",
    fontSize: 12,
    marginTop: 4,
  },
  notificationButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FFC857",
    position: "absolute",
    top: 10,
    right: 11,
  },
  searchContainer: {
    backgroundColor: WHITE,
    marginHorizontal: 20,
    marginTop: -22,
    height: 51,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: BORDER,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  searchInput: {
    flex: 1,
    color: DARK,
    fontSize: 13,
    marginLeft: 10,
    paddingVertical: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 23,
  },
  sosCard: {
    backgroundColor: RED,
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  sosTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  sosTitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: "800",
  },
  sosDescription: {
    color: "#F5DADA",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
    marginBottom: 15,
  },
  sosButton: {
    backgroundColor: WHITE,
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 11,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  sosButtonText: {
    color: RED,
    fontWeight: "800",
    fontSize: 11,
  },
  sosIconCircle: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  sosSmallCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: WHITE,
    position: "absolute",
    right: -1,
    bottom: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 26,
    marginBottom: 13,
  },
  sectionTitle: {
    color: DARK,
    fontSize: 17,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: GRAY,
    fontSize: 12,
    marginTop: 4,
  },
  seeAll: {
    color: RED,
    fontSize: 12,
    fontWeight: "700",
  },
  vehicleGrid: {
    flexDirection: "row",
    gap: 10,
  },
  vehicleCard: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },
  vehicleIcon: {
    width: 49,
    height: 49,
    borderRadius: 16,
    backgroundColor: LIGHT_RED,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },
  vehicleTitle: {
    fontSize: 11,
    color: DARK,
    fontWeight: "700",
    textAlign: "center",
  },
  costCard: {
    backgroundColor: WHITE,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 15,
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  costIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  costTextContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  costTitle: {
    color: DARK,
    fontSize: 13,
    fontWeight: "800",
  },
  costSubtitle: {
    color: GRAY,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },
  garageCard: {
    backgroundColor: WHITE,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
  },
  garageIcon: {
    width: 57,
    height: 57,
    borderRadius: 16,
    backgroundColor: LIGHT_RED,
    justifyContent: "center",
    alignItems: "center",
  },
  garageInfo: {
    flex: 1,
    marginLeft: 12,
  },
  garageName: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
  },
  garageType: {
    color: GRAY,
    fontSize: 11,
    marginTop: 4,
  },
  garageMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  metaText: {
    color: GRAY,
    fontSize: 10,
    marginLeft: 3,
  },
  starIcon: {
    marginLeft: 10,
  },
  rating: {
    color: DARK,
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 3,
  },
  garagePrice: {
    color: RED,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 6,
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 25,
  },
  emptyText: {
    color: GRAY,
    fontSize: 13,
    marginTop: 8,
  },
  servicesRow: {
    paddingBottom: 2,
    gap: 12,
  },
  serviceCard: {
    width: 155,
    backgroundColor: WHITE,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
  },
  serviceIcon: {
    width: 49,
    height: 49,
    borderRadius: 15,
    backgroundColor: LIGHT_RED,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceTitle: {
    color: DARK,
    fontSize: 12,
    fontWeight: "800",
  },
  serviceSubtitle: {
    color: GRAY,
    fontSize: 10,
    marginTop: 5,
  },
  showroomCard: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  showroomIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: LIGHT_RED,
    justifyContent: "center",
    alignItems: "center",
  },
  showroomInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  showroomTitle: {
    color: DARK,
    fontSize: 13,
    fontWeight: "800",
  },
  showroomSubtitle: {
    color: GRAY,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },
  tipCard: {
    backgroundColor: LIGHT_RED,
    borderRadius: 16,
    padding: 15,
    marginTop: 22,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    color: RED,
    fontSize: 13,
    fontWeight: "800",
  },
  tipDescription: {
    color: "#5F4545",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },
  footer: {
    color: GRAY,
    textAlign: "center",
    fontSize: 10,
    marginTop: 22,
    marginBottom: 25,
  },
});
