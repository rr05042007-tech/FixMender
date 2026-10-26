```tsx
// app/garages/[garageId].tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const RED = "#8B0000";
const LIGHT_RED = "#FFF0F0";
const BG = "#F7F7F7";
const TEXT = "#202020";
const MUTED = "#777777";

type GarageInfo = {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  reviews: number;
  price: string;
  open: boolean;
  phone: string;
  address: string;
  description: string;
  services: string[];
  icon: keyof typeof Ionicons.glyphMap;
};

const GARAGES: GarageInfo[] = [
  {
    id: "1",
    name: "AutoCare Service Center",
    category: "Multi-brand Garage",
    distance: "1.2 km",
    rating: 4.8,
    reviews: 124,
    price: "₹299 onwards",
    open: true,
    phone: "+91 98765 43210",
    address: "Demo address — update with the real garage location",
    description:
      "General vehicle servicing, maintenance and repair support for multiple vehicle brands.",
    services: [
      "General servicing",
      "Engine repair",
      "Battery check",
      "Brake inspection",
      "Oil change",
      "Tyre repair",
    ],
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
    phone: "+91 98765 43211",
    address: "Demo address — update with the real garage location",
    description:
      "Two-wheeler servicing and repair support for bikes, scooters and common roadside issues.",
    services: [
      "Bike servicing",
      "Scooty repair",
      "Battery replacement",
      "Flat tyre repair",
      "Brake repair",
    ],
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
    phone: "+91 98765 43212",
    address: "Demo address — update with the real garage location",
    description:
      "Specialized support for electric vehicles, including EV diagnostics and battery checks.",
    services: [
      "EV diagnostics",
      "Battery inspection",
      "Charging issue check",
      "Electric bike repair",
      "Electric car servicing",
    ],
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
    phone: "+91 98765 43213",
    address: "Demo address — update with the real garage location",
    description:
      "Repair and maintenance support for trucks, diesel engines and other heavy vehicles.",
    services: [
      "Truck repair",
      "Diesel engine service",
      "Brake inspection",
      "Battery service",
      "Heavy vehicle maintenance",
    ],
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
    phone: "+91 98765 43214",
    address: "Demo address — update with the real garage location",
    description:
      "Everyday vehicle maintenance, tyre repair and general mechanical services.",
    services: [
      "Car servicing",
      "Bike repair",
      "Tyre repair",
      "Oil change",
      "General maintenance",
    ],
    icon: "construct-outline",
  },
];

export default function GarageDetailsScreen() {
  const router = useRouter();
  const { garageId } = useLocalSearchParams<{ garageId: string }>();

  const garage = GARAGES.find((item) => item.id === garageId);

  const requestService = () => {
    if (!garage) return;

    router.push({
      pathname: "/sos",
      params: {
        company: garage.name,
      },
    });
  };

  const handleCall = () => {
    Alert.alert(
      "Contact garage",
      `Demo contact number: ${garage?.phone}\n\nConnect a real phone-call action before using this feature.`
    );
  };

  if (!garage) {
    return (
      <View style={styles.notFoundContainer}>
        <StatusBar barStyle="light-content" backgroundColor={RED} />
        <Ionicons name="business-outline" size={58} color={RED} />
        <Text style={styles.notFoundTitle}>Garage not found</Text>
        <Text style={styles.notFoundText}>
          This garage may not exist in the current demo list.
        </Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace("/garages")}
        >
          <Text style={styles.primaryButtonText}>Browse garages</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={RED} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Garage Details</Text>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() =>
              Alert.alert(
                "Save garage",
                "Saved garages are not stored yet. Add persistent storage to enable this feature."
              )
            }
            accessibilityLabel="Save garage"
          >
            <Ionicons name="heart-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Garage hero */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Ionicons name={garage.icon} size={46} color={RED} />
          </View>

          <Text style={styles.garageName}>{garage.name}</Text>
          <Text style={styles.category}>{garage.category}</Text>

          <View style={styles.ratingPill}>
            <Ionicons name="star" size={16} color="#F5A623" />
            <Text style={styles.ratingValue}>
              {garage.rating.toFixed(1)}
            </Text>
            <Text style={styles.reviewCount}>
              ({garage.reviews} reviews)
            </Text>
          </View>

          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: garage.open ? "#239B56" : "#999999" },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: garage.open ? "#218838" : MUTED },
              ]}
            >
              {garage.open ? "Open now" : "Currently closed"}
            </Text>
            <View style={styles.statusSeparator} />
            <Ionicons name="location-outline" size={15} color={MUTED} />
            <Text style={styles.distanceText}>{garage.distance} away</Text>
          </View>
        </View>

        {/* Quick information */}
        <View style={styles.quickInfoRow}>
          <View style={styles.quickInfoCard}>
            <View style={styles.quickIcon}>
              <Ionicons name="cash-outline" size={22} color={RED} />
            </View>
            <Text style={styles.quickLabel}>Starting price</Text>
            <Text style={styles.quickValue}>{garage.price}</Text>
          </View>

          <View style={styles.quickInfoCard}>
            <View style={styles.quickIcon}>
              <Ionicons name="time-outline" size={22} color={RED} />
            </View>
            <Text style={styles.quickLabel}>Availability</Text>
            <Text style={styles.quickValue}>
              {garage.open ? "Open now" : "Closed"}
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={handleCall}
          >
            <Ionicons name="call-outline" size={19} color={RED} />
            <Text style={styles.callButtonText}>Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={requestService}
          >
            <Ionicons name="construct-outline" size={19} color="#FFFFFF" />
            <Text style={styles.bookButtonText}>Request service</Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About this garage</Text>
          <Text style={styles.description}>{garage.description}</Text>

          <View style={styles.addressRow}>
            <View style={styles.addressIcon}>
              <Ionicons name="location-outline" size={21} color={RED} />
            </View>
            <View style={styles.addressContent}>
              <Text style={styles.addressLabel}>Address</Text>
              <Text style={styles.addressText}>{garage.address}</Text>
            </View>
          </View>
        </View>

        {/* Services */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeadingRow}>
            <Text style={styles.sectionTitle}>Services offered</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>
                {garage.services.length}
              </Text>
            </View>
          </View>

          {garage.services.map((service) => (
            <View key={service} style={styles.serviceRow}>
              <View style={styles.serviceCheck}>
                <Ionicons name="checkmark" size={15} color={RED} />
              </View>
              <Text style={styles.serviceText}>{service}</Text>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#239B56"
              />
            </View>
          ))}
        </View>

        {/* Ratings */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Customer ratings</Text>

          <View style={styles.ratingSummary}>
            <Text style={styles.bigRating}>{garage.rating.toFixed(1)}</Text>
            <View style={styles.ratingSummaryRight}>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= Math.round(garage.rating) ? "star" : "star-outline"}
                    size={18}
                    color="#F5A623"
                  />
                ))}
              </View>
              <Text style={styles.reviewCount}>
                Based on {garage.reviews} demo reviews
              </Text>
            </View>
          </View>

          <Text style={styles.ratingDisclaimer}>
            Ratings are sample values for this prototype and are not verified
            customer reviews.
          </Text>
        </View>

        {/* Emergency support */}
        <TouchableOpacity
          style={styles.emergencyCard}
          onPress={() => router.push("/sos")}
          activeOpacity={0.9}
        >
          <View style={styles.emergencyIcon}>
            <Ionicons name="warning-outline" size={25} color="#FFFFFF" />
          </View>
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>Vehicle breakdown?</Text>
            <Text style={styles.emergencySubtitle}>
              Open FixMender SOS assistance
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Prices, addresses, contact numbers, ratings and distances are
          illustrative. Confirm details before requesting service.
        </Text>
      </ScrollView>

      {/* Bottom action */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPriceContainer}>
          <Text style={styles.bottomPriceLabel}>Service starts at</Text>
          <Text style={styles.bottomPrice}>{garage.price}</Text>
        </View>

        <TouchableOpacity
          style={styles.bottomButton}
          onPress={requestService}
        >
          <Text style={styles.bottomButtonText}>Request mechanic</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: RED,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    marginHorizontal: 12,
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },
  hero: {
    backgroundColor: RED,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
    marginBottom: 14,
  },
  garageName: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    textAlign: "center",
  },
  category: {
    color: "#F6DADA",
    fontSize: 13,
    marginTop: 7,
  },
  ratingPill: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 13,
  },
  ratingValue: {
    color: TEXT,
    fontWeight: "800",
    fontSize: 13,
  },
  reviewCount: {
    color: MUTED,
    fontSize: 11,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6,
    marginTop: 15,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  statusSeparator: {
    width: 1,
    height: 15,
    backgroundColor: "#D7A4A4",
    marginHorizontal: 5,
  },
  distanceText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  quickInfoRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    marginTop: -1,
    marginBottom: 14,
  },
  quickInfoCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  quickLabel: {
    fontSize: 11,
    color: MUTED,
  },
  quickValue: {
    fontSize: 14,
    color: TEXT,
    fontWeight: "800",
    marginTop: 5,
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  callButton: {
    flex: 0.8,
    minHeight: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: RED,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  callButtonText: {
    color: RED,
    fontSize: 13,
    fontWeight: "800",
  },
  bookButton: {
    flex: 1.4,
    minHeight: 48,
    backgroundColor: RED,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 13,
    padding: 17,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  sectionHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 10,
  },
  sectionTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: "800",
  },
  description: {
    color: MUTED,
    fontSize: 13,
    lineHeight: 21,
    marginTop: 10,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 11,
    marginTop: 17,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  addressIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  addressContent: {
    flex: 1,
  },
  addressLabel: {
    color: TEXT,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },
  addressText: {
    color: MUTED,
    fontSize: 12,
    lineHeight: 18,
  },
  countBadge: {
    backgroundColor: LIGHT_RED,
    borderRadius: 10,
    minWidth: 25,
    paddingHorizontal: 7,
    paddingVertical: 4,
    alignItems: "center",
  },
  countBadgeText: {
    color: RED,
    fontSize: 11,
    fontWeight: "800",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
    gap: 10,
  },
  serviceCheck: {
    width: 25,
    height: 25,
    borderRadius: 8,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceText: {
    flex: 1,
    color: TEXT,
    fontSize: 13,
  },
  ratingSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginTop: 17,
  },
  bigRating: {
    color: TEXT,
    fontSize: 43,
    fontWeight: "800",
  },
  ratingSummaryRight: {
    flex: 1,
    gap: 7,
  },
  starsRow: {
    flexDirection: "row",
    gap: 3,
  },
  ratingDisclaimer: {
    color: MUTED,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 13,
  },
  emergencyCard: {
    marginHorizontal: 16,
    marginTop: 1,
    marginBottom: 14,
    backgroundColor: RED,
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  emergencyIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  emergencyTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  emergencySubtitle: {
    color: "#F6DADA",
    fontSize: 11,
    marginTop: 5,
  },
  disclaimer: {
    color: MUTED,
    textAlign: "center",
    fontSize: 10,
    lineHeight: 16,
    marginHorizontal: 25,
    marginBottom: 10,
  },
  bottomBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomPriceContainer: {
    flex: 1,
  },
  bottomPriceLabel: {
    color: MUTED,
    fontSize: 10,
  },
  bottomPrice: {
    color: RED,
    fontSize: 13,
    fontWeight: "800",
    marginTop: 4,
  },
  bottomButton: {
    backgroundColor: RED,
    borderRadius: 12,
    minHeight: 47,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  bottomButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  notFoundContainer: {
    flex: 1,
    backgroundColor: BG,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },
  notFoundTitle: {
    color: TEXT,
    fontSize: 21,
    fontWeight: "800",
    marginTop: 18,
  },
  notFoundText: {
    color: MUTED,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 22,
  },
  primaryButton: {
    backgroundColor: RED,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});
```