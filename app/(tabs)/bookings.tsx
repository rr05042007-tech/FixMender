
import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type BookingStatus = "Upcoming" | "In Progress" | "Completed" | "Cancelled";

type Booking = {
  id: string;
  service: string;
  vehicle: string;
  garage: string;
  date: string;
  time: string;
  cost: string;
  status: BookingStatus;
  icon: keyof typeof Ionicons.glyphMap;
};

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "FM2001",
    service: "General Servicing",
    vehicle: "Maruti Swift",
    garage: "City Auto Care",
    date: "25 Oct 2026",
    time: "10:30 AM",
    cost: "₹1,800",
    status: "Upcoming",
    icon: "construct-outline",
  },
  {
    id: "FM2002",
    service: "Battery Check",
    vehicle: "Honda Activa",
    garage: "QuickFix Garage",
    date: "26 Oct 2026",
    time: "12:00 PM",
    cost: "₹500",
    status: "Upcoming",
    icon: "battery-charging-outline",
  },
  {
    id: "FM2003",
    service: "Engine Repair",
    vehicle: "Hyundai i20",
    garage: "Reliable Motors",
    date: "18 Oct 2026",
    time: "11:00 AM",
    cost: "₹2,500",
    status: "Completed",
    icon: "settings-outline",
  },
  {
    id: "FM2004",
    service: "Tyre Repair",
    vehicle: "Honda Activa",
    garage: "QuickFix Garage",
    date: "20 Oct 2026",
    time: "04:00 PM",
    cost: "₹0",
    status: "Cancelled",
    icon: "disc-outline",
  },
];

const FILTERS = [
  "All",
  "Upcoming",
  "In Progress",
  "Completed",
  "Cancelled",
] as const;

type Filter = (typeof FILTERS)[number];

export default function BookingsScreen() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesFilter =
        filter === "All" || booking.status === filter;

      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        booking.service.toLowerCase().includes(query) ||
        booking.vehicle.toLowerCase().includes(query) ||
        booking.garage.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [bookings, filter, search]);

  const upcomingCount = bookings.filter(
    (booking) =>
      booking.status === "Upcoming" ||
      booking.status === "In Progress"
  ).length;

  const cancelBooking = (booking: Booking) => {
    if (
      booking.status !== "Upcoming" &&
      booking.status !== "In Progress"
    ) {
      Alert.alert(
        "Cancellation unavailable",
        "Only active bookings can be cancelled."
      );
      return;
    }

    Alert.alert(
      "Cancel Booking?",
      `Do you want to cancel ${booking.service} (${booking.id})?`,
      [
        { text: "Keep Booking", style: "cancel" },
        {
          text: "Cancel Booking",
          style: "destructive",
          onPress: () => {
            setBookings((previous) =>
              previous.map((item) =>
                item.id === booking.id
                  ? { ...item, status: "Cancelled" }
                  : item
              )
            );
          },
        },
      ]
    );
  };

  const statusStyle = (status: BookingStatus) => {
    switch (status) {
      case "Upcoming":
        return styles.upcomingBadge;
      case "In Progress":
        return styles.progressBadge;
      case "Completed":
        return styles.completedBadge;
      case "Cancelled":
        return styles.cancelledBadge;
    }
  };

  const statusTextStyle = (status: BookingStatus) => {
    switch (status) {
      case "Upcoming":
        return styles.upcomingText;
      case "In Progress":
        return styles.progressText;
      case "Completed":
        return styles.completedText;
      case "Cancelled":
        return styles.cancelledText;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>My Bookings</Text>
            <Text style={styles.subtitle}>
              Manage your vehicle services
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color="#A20D18"
            />
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons
              name="calendar"
              size={25}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.summaryInfo}>
            <Text style={styles.summaryNumber}>
              {upcomingCount}
            </Text>
            <Text style={styles.summaryLabel}>
              Active Bookings
            </Text>
          </View>

          <Ionicons
            name="car-sport-outline"
            size={42}
            color="#F5C7CA"
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
            placeholder="Search booking, garage or vehicle"
            placeholderTextColor="#999999"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            accessibilityLabel="Search bookings"
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

        <Text style={styles.sectionTitle}>Your Services</Text>

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
                onPress={() => setFilter(item)}
                style={[
                  styles.filterButton,
                  selected && styles.filterSelected,
                ]}
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

        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="calendar-clear-outline"
              size={48}
              color="#B8B8B8"
            />
            <Text style={styles.emptyTitle}>
              No bookings found
            </Text>
            <Text style={styles.emptySubtitle}>
              Try a different filter or search for another service.
            </Text>
          </View>
        ) : (
          filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.cardHeader}>
                <View style={styles.serviceIcon}>
                  <Ionicons
                    name={booking.icon}
                    size={24}
                    color="#A20D18"
                  />
                </View>

                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>
                    {booking.service}
                  </Text>
                  <Text style={styles.vehicleName}>
                    {booking.vehicle}
                  </Text>
                </View>
              </View>

              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusBadge,
                    statusStyle(booking.status),
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      statusTextStyle(booking.status),
                    ]}
                  >
                    {booking.status}
                  </Text>
                </View>

                <Text style={styles.bookingId}>
                  ID: {booking.id}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.detailRow}>
                <Ionicons
                  name="business-outline"
                  size={17}
                  color="#777777"
                />
                <Text style={styles.detailText}>
                  {booking.garage}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons
                  name="calendar-outline"
                  size={17}
                  color="#777777"
                />
                <Text style={styles.detailText}>
                  {booking.date}
                </Text>
                <Ionicons
                  name="time-outline"
                  size={17}
                  color="#777777"
                />
                <Text style={styles.detailText}>
                  {booking.time}
                </Text>
              </View>

              <View style={styles.footerRow}>
                <View>
                  <Text style={styles.costLabel}>
                    Estimated Cost
                  </Text>
                  <Text style={styles.cost}>{booking.cost}</Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() =>
                      router.push({
                        pathname: "/bookings/[bookingId]",
                        params: { bookingId: booking.id },
                      })
                    }
                  >
                    <Text style={styles.detailsText}>Details</Text>
                  </TouchableOpacity>

                  {(booking.status === "Upcoming" ||
                    booking.status === "In Progress") && (
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={() => cancelBooking(booking)}
                    >
                      <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))
        )}

        <Text style={styles.disclaimer}>
          Sample bookings for UI testing. Actual booking data and
          cancellation policies must come from your backend.
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
  content: {
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
    color: "#777777",
    fontSize: 13,
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
    backgroundColor: "#A20D18",
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
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
    paddingHorizontal: 14,
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
  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#F0E5E5",
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  cardHeader: {
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
  serviceName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#252525",
  },
  vehicleName: {
    fontSize: 12,
    color: "#777777",
    marginTop: 5,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  upcomingBadge: {
    backgroundColor: "#FFF0F1",
  },
  upcomingText: {
    color: "#A20D18",
  },
  progressBadge: {
    backgroundColor: "#FFF2D7",
  },
  progressText: {
    color: "#986500",
  },
  completedBadge: {
    backgroundColor: "#E7F6EB",
  },
  completedText: {
    color: "#16803C",
  },
  cancelledBadge: {
    backgroundColor: "#FCE8E8",
  },
  cancelledText: {
    color: "#B91C1C",
  },
  bookingId: {
    fontSize: 10,
    color: "#999999",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0E8E8",
    marginVertical: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 11,
    flexWrap: "wrap",
  },
  detailText: {
    fontSize: 11,
    color: "#666666",
    marginRight: 5,
    flexShrink: 1,
  },
  footerRow: {
    borderTopWidth: 1,
    borderTopColor: "#F0E8E8",
    paddingTop: 13,
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  costLabel: {
    fontSize: 10,
    color: "#888888",
  },
  cost: {
    fontSize: 17,
    fontWeight: "800",
    color: "#252525",
    marginTop: 3,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  detailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#A20D18",
  },
  detailsText: {
    fontSize: 11,
    color: "#A20D18",
    fontWeight: "700",
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: "#FFF0F1",
  },
  cancelText: {
    fontSize: 11,
    color: "#A20D18",
    fontWeight: "700",
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
