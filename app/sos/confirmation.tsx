
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
import { useRouter, useLocalSearchParams } from "expo-router";

const RED = "#8B0000";
const WHITE = "#FFFFFF";
const DARK = "#222222";
const GRAY = "#777777";
const BG = "#FAFAFA";
const LIGHT_RED = "#FFF0F0";
const BORDER = "#EEEEEE";

export default function ConfirmationScreen() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    vehicleType?: string;
    powerType?: string;
    company?: string;
    model?: string;
    vehicleName?: string;
    registration?: string;
    issue?: string;
    description?: string;
    urgency?: string;
    isVehicleMovable?: string;
    additionalHelp?: string;
    location?: string;
    locationType?: string;
    saveAddress?: string;
  }>();

  const confirmRequest = () => {
    Alert.alert(
      "Confirm SOS Request",
      "Do you want to submit this roadside assistance request?",
      [
        { text: "Review Details", style: "cancel" },
        {
          text: "Confirm Request",
          onPress: () => {
            // Demo-only confirmation. No mechanic is contacted.
            router.replace({
              pathname: "/sos/success",
              params: {
                ...params,
                requestStatus: "submitted",
              },
            });
          },
        },
      ]
    );
  };

  const DetailRow = ({
    icon,
    label,
    value,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
  }) => (
    <View style={styles.detailRow}>
      <View style={styles.detailIcon}>
        <Ionicons name={icon} size={20} color={RED} />
      </View>

      <View style={styles.detailTextContainer}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value?.trim() || "Not provided"}</Text>
      </View>
    </View>
  );

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
          <Text style={styles.headerTitle}>Confirm Request</Text>
          <Text style={styles.headerSubtitle}>
            Review your roadside assistance details
          </Text>
        </View>

        <Ionicons name="clipboard-outline" size={28} color={WHITE} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Intro */}
        <View style={styles.introCard}>
          <View style={styles.introIcon}>
            <Ionicons name="shield-checkmark-outline" size={30} color={RED} />
          </View>

          <Text style={styles.introTitle}>Almost there!</Text>
          <Text style={styles.introDescription}>
            Check your information carefully before confirming your service
            request.
          </Text>
        </View>

        {/* Vehicle Details */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderIcon}>
              <Ionicons name="car-sport-outline" size={21} color={RED} />
            </View>
            <Text style={styles.sectionTitle}>Vehicle Details</Text>
          </View>

          <DetailRow
            icon="car-outline"
            label="Vehicle"
            value={params.vehicleName || params.vehicleType}
          />

          <DetailRow
            icon="flash-outline"
            label="Power Type"
            value={params.powerType}
          />

          <DetailRow
            icon="business-outline"
            label="Brand"
            value={params.company}
          />

          <DetailRow
            icon="pricetag-outline"
            label="Model"
            value={params.model}
          />

          {params.registration ? (
            <DetailRow
              icon="card-outline"
              label="Registration Number"
              value={params.registration}
            />
          ) : null}
        </View>

        {/* Problem Details */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderIcon}>
              <Ionicons name="construct-outline" size={21} color={RED} />
            </View>
            <Text style={styles.sectionTitle}>Problem Details</Text>
          </View>

          <DetailRow
            icon="warning-outline"
            label="Reported Problem"
            value={params.issue}
          />

          <DetailRow
            icon="time-outline"
            label="Urgency"
            value={params.urgency || "Urgent"}
          />

          <DetailRow
            icon="speedometer-outline"
            label="Vehicle Movable?"
            value={params.isVehicleMovable}
          />

          <DetailRow
            icon="people-outline"
            label="Additional Roadside Support"
            value={
              params.additionalHelp === "true" ? "Requested" : "Not requested"
            }
          />

          {params.description ? (
            <View style={styles.descriptionCard}>
              <Text style={styles.detailLabel}>Additional Description</Text>
              <Text style={styles.descriptionText}>{params.description}</Text>
            </View>
          ) : null}
        </View>

        {/* Location */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderIcon}>
              <Ionicons name="location-outline" size={21} color={RED} />
            </View>
            <Text style={styles.sectionTitle}>Service Location</Text>
          </View>

          <DetailRow
            icon="navigate-outline"
            label="Address"
            value={params.location}
          />

          {params.locationType ? (
            <DetailRow
              icon="bookmark-outline"
              label="Saved As"
              value={params.locationType}
            />
          ) : null}
        </View>

        {/* Notice */}
        <View style={styles.noticeCard}>
          <Ionicons name="information-circle-outline" size={23} color={RED} />
          <View style={styles.noticeTextContainer}>
            <Text style={styles.noticeTitle}>Before you confirm</Text>
            <Text style={styles.noticeText}>
              Ensure your vehicle details, reported issue, and location are
              correct. This demo does not dispatch a mechanic or guarantee
              assistance.
            </Text>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmRequest}
          activeOpacity={0.85}
        >
          <Ionicons name="checkmark-circle-outline" size={22} color={WHITE} />
          <Text style={styles.confirmButtonText}>Confirm SOS Request</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.back()}
          activeOpacity={0.85}
        >
          <Ionicons name="create-outline" size={19} color={RED} />
          <Text style={styles.editButtonText}>Go Back and Edit</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          FixMender • Roadside assistance request preview
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
  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 35,
  },
  introCard: {
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 18,
    padding: 21,
    borderWidth: 1,
    borderColor: BORDER,
  },
  introIcon: {
    width: 61,
    height: 61,
    borderRadius: 20,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  introTitle: {
    color: DARK,
    fontSize: 21,
    fontWeight: "800",
    marginTop: 13,
  },
  introDescription: {
    color: GRAY,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 7,
  },
  sectionCard: {
    backgroundColor: WHITE,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 15,
    marginTop: 17,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionHeaderIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  sectionTitle: {
    color: DARK,
    fontSize: 15,
    fontWeight: "800",
    flex: 1,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
    gap: 11,
  },
  detailIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: "#FFF7F7",
    alignItems: "center",
    justifyContent: "center",
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    color: GRAY,
    fontSize: 10,
    fontWeight: "600",
  },
  detailValue: {
    color: DARK,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
    lineHeight: 18,
  },
  descriptionCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  descriptionText: {
    color: DARK,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 6,
  },
  noticeCard: {
    backgroundColor: LIGHT_RED,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 20,
  },
  noticeTextContainer: {
    flex: 1,
  },
  noticeTitle: {
    color: RED,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 5,
  },
  noticeText: {
    color: DARK,
    fontSize: 11,
    lineHeight: 17,
  },
  confirmButton: {
    backgroundColor: RED,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  confirmButtonText: {
    color: WHITE,
    fontSize: 14,
    fontWeight: "800",
  },
  editButton: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: RED,
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  editButtonText: {
    color: RED,
    fontSize: 13,
    fontWeight: "800",
  },
  footerText: {
    color: GRAY,
    fontSize: 10,
    textAlign: "center",
    marginTop: 17,
  },
});
