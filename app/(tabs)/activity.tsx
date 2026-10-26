
import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ActivityItem = {
  id: string;
  title: string;
  vehicle: string;
  date: string;
  status: "Completed" | "In Progress" | "Cancelled";
  cost: string;
  type: "Repair" | "SOS" | "Service";
  icon: keyof typeof Ionicons.glyphMap;
};

const ACTIVITIES: ActivityItem[] = [
  {
    id: "FM1001",
    title: "Engine Repair",
    vehicle: "Hyundai i20",
    date: "18 Oct 2026",
    status: "Completed",
    cost: "₹2,500",
    type: "Repair",
    icon: "construct-outline",
  },
  {
    id: "FM1002",
    title: "Emergency Assistance",
    vehicle: "Honda Activa",
    date: "15 Oct 2026",
    status: "Completed",
    cost: "₹500",
    type: "SOS",
    icon: "warning-outline",
  },
  {
    id: "FM1003",
    title: "Regular Servicing",
    vehicle: "Maruti Swift",
    date: "12 Oct 2026",
    status: "In Progress",
    cost: "₹1,800",
    type: "Service",
    icon: "settings-outline",
  },
  {
    id: "FM1004",
    title: "Battery Replacement",
    vehicle: "TVS Jupiter",
    date: "08 Oct 2026",
    status: "Cancelled",
    cost: "₹0",
    type: "Repair",
    icon: "battery-charging-outline",
  },
];

const FILTERS = ["All", "Completed", "In Progress", "Cancelled"] as const;

type Filter = (typeof FILTERS)[number];

export default function ActivityScreen() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");

  const filteredActivities = useMemo(() => {
    return ACTIVITIES.filter((item) => {
      const matchesFilter =
        filter === "All" || item.status === filter;

      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.vehicle.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const completedCount = ACTIVITIES.filter(
    (item) => item.status === "Completed"
  ).length;

  const getStatusStyle = (status: ActivityItem["status"]) => {
    switch (status) {
      case "Completed":
        return styles.completedBadge;
      case "In Progress":
        return styles.progressBadge;
      case "Cancelled":
        return styles.cancelledBadge;
    }
  };

  const getStatusTextStyle = (status: ActivityItem["status"]) => {
    switch (status) {
      case "Completed":
        return styles.completedText;
      case "In Progress":
        return styles.progressText;
      case "Cancelled":
        return styles.cancelledText;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>My Activity</Text>
            <Text style={styles.subtitle}>
              Your vehicle service history
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="time-outline"
              size={24}
              color="#A20D18"
            />
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons
              name="checkmark-done-circle-outline"
              size={28}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.summaryInfo}>
            <Text style={styles.summaryNumber}>
              {completedCount}
            </Text>
            <Text style={styles.summaryLabel}>
              Completed Services
            </Text>
          </View>

          <Ionicons
            name="car-sport-outline"
            size={42}
            color="#F6C8CB"
          />
        </View>

        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#888888"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search service, vehicle or ID"
            placeholderTextColor="#999999"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            accessibilityLabel="Search activity"
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch("")}
              accessibilityLabel="Clear search"
            >
              <Ionicons
                name="close-circle"
                size={20}
                color="#888888"
              />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.sectionTitle}>Service History</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {FILTERS.map((item) => {
            const selected = filter === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.filterButton,
                  selected && styles.filterSelected,
                ]}
                onPress={() => setFilter(item)}
                accessibilityRole="button"
                accessibilityState={{ selected }}
              >
                <Text
                  style={[
                    styles.filterText,
                    selected && styles.filterTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {filteredActivities.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="file-tray-outline"
              size={48}
              color="#B8B8B8"
            />
            <Text style={styles.emptyTitle}>
              No activity found
            </Text>
            <Text style={styles.emptySubtitle}>
              Try another search or filter to find your services.
            </Text>
          </View>
        ) : (
          filteredActivities.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.activityCard}
              activeOpacity={0.8}
              onPress={() => {
                // Connect this to the real service details screen.
              }}
            >
              <View style={styles.cardTop}>
                <View style={styles.serviceIcon}>
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color="#A20D18"
                  />
                </View>

                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.vehicleText}>
                    {item.vehicle}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    getStatusStyle(item.status),
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      getStatusTextStyle(item.status),
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardDivider} />

              <View style={styles.cardBottom}>
                <View style={styles.dateContainer}>
                  <Ionicons
                    name="calendar-outline"
                    size={15}
                    color="#777777"
                  />
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>

                <Text style={styles.cost}>{item.cost}</Text>
              </View>

              <View style={styles.referenceRow}>
                <Text style={styles.referenceText}>
                  ID: {item.id}
                </Text>
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <Text style={styles.disclaimer}>
          Demo activity only. Connect your backend to display actual
          service history and verified repair costs.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7F7",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#252525",
  },
  subtitle: {
    fontSize: 13,
    color: "#777777",
    marginTop: 5,
  },
  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F1D5D7",
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A20D18",
    borderRadius: 18,
    padding: 20,
    marginBottom: 22,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#BD3540",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#FBE1E3",
    marginTop: 3,
  },
  searchBox: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAE0E0",
    borderRadius: 12,
    paddingHorizontal: 13,
    gap: 10,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    color: "#252525",
    fontSize: 13,
    paddingVertical: 12,
  },
  sectionTitle: {
    color: "#252525",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  filters: {
    gap: 9,
    paddingBottom: 17,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8DCDD",
  },
  filterSelected: {
    backgroundColor: "#A20D18",
    borderColor: "#A20D18",
  },
  filterText: {
    color: "#666666",
    fontSize: 12,
    fontWeight: "600",
  },
  filterTextSelected: {
    color: "#FFFFFF",
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#F0E5E5",
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  serviceIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#FFF0F1",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    color: "#252525",
    fontSize: 14,
    fontWeight: "700",
  },
  vehicleText: {
    color: "#777777",
    fontSize: 12,
    marginTop: 5,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  completedBadge: {
    backgroundColor: "#E7F6EB",
  },
  completedText: {
    color: "#16803C",
  },
  progressBadge: {
    backgroundColor: "#FFF2D7",
  },
  progressText: {
    color: "#986500",
  },
  cancelledBadge: {
    backgroundColor: "#FCE8E8",
  },
  cancelledText: {
    color: "#B91C1C",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F0E8E8",
    marginVertical: 14,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 11,
    color: "#777777",
  },
  cost: {
    fontSize: 16,
    fontWeight: "800",
    color: "#252525",
  },
  referenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  referenceText: {
    fontSize: 10,
    color: "#999999",
  },
  typeText: {
    fontSize: 10,
    color: "#A20D18",
    fontWeight: "600",
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 35,
    alignItems: "center",
    marginTop: 8,
  },
  emptyTitle: {
    color: "#252525",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 14,
  },
  emptySubtitle: {
    color: "#777777",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 7,
  },
  disclaimer: {
    color: "#888888",
    fontSize: 10,
    textAlign: "center",
    lineHeight: 16,
    marginTop: 10,
  },
});


import React from "react";
import { View, ScrollView, Text } from "react-native";
import ActivityCard from "../../src/features/activity/components/ActivityCard";
import type { Activity } from "../../src/features/activity/types";

const sampleActivities: Activity[] = [
  {
    id: "1",
    type: "Repair",
    title: "Bike Repair",
    vehicleName: "TVS Apache",
    garageName: "City Bike Service",
    date: "23 Oct 2026",
    status: "Completed",
    cost: 850,
  },
  {
    id: "2",
    type: "SOS",
    title: "Roadside Assistance",
    vehicleName: "Electric Scooter",
    garageName: "Nearby Mechanic",
    date: "24 Oct 2026",
    status: "Upcoming",
  },
];

export default function ActivityScreen() {
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 16,
          color: "#222222",
        }}
      >
        My Activity
      </Text>

      {sampleActivities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </ScrollView>
  );
}
