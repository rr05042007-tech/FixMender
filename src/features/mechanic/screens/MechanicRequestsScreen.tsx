import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import {
  acceptMechanicSosRequest,
  getAssignedMechanicSosRequests,
  getAvailableMechanicSosRequests,
  type MechanicSosRequest,
} from "../../../services/sos.service";

const RED = "#8B0000";
type RequestTab = "available" | "accepted";

export default function MechanicRequestsScreen() {
  const [activeTab, setActiveTab] = useState<RequestTab>("available");
  const [available, setAvailable] = useState<MechanicSosRequest[]>([]);
  const [accepted, setAccepted] = useState<MechanicSosRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadRequests = useCallback(async () => {
    setError("");
    try {
      const [availableRequests, assignedRequests] = await Promise.all([
        getAvailableMechanicSosRequests(),
        getAssignedMechanicSosRequests(),
      ]);
      setAvailable(availableRequests);
      setAccepted(assignedRequests);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load SOS requests."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  const refresh = () => {
    setRefreshing(true);
    void loadRequests();
  };

  const acceptRequest = (request: MechanicSosRequest) => {
    Alert.alert(
      "Accept SOS request",
      "Accept this owner's roadside assistance request?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Accept request",
          onPress: () => {
            void (async () => {
              setAcceptingId(request.id);
              setError("");
              try {
                await acceptMechanicSosRequest(request.id);
                setActiveTab("accepted");
                await loadRequests();
              } catch (acceptError) {
                setError(
                  acceptError instanceof Error
                    ? acceptError.message
                    : "Unable to accept this SOS request."
                );
              } finally {
                setAcceptingId(null);
              }
            })();
          },
        },
      ]
    );
  };

  const openLocation = async (request: MechanicSosRequest) => {
    if (request.latitude === null || request.longitude === null) {
      Alert.alert(
        "Location unavailable",
        request.location_address || "This request has no saved GPS coordinates."
      );
      return;
    }

    const url = `https://www.google.com/maps/search/?api=1&query=${request.latitude},${request.longitude}`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Unable to open map", "Please try opening the location again.");
    }
  };

  const requests = activeTab === "available" ? available : accepted;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={RED} style="light" />
      <View style={styles.header}>
        <Text style={styles.overline}>FIXMENDER PARTNER</Text>
        <Text style={styles.title}>
          {activeTab === "available" ? "SOS Requests" : "Accepted Requests"}
        </Text>
        <Text style={styles.subtitle}>
          {activeTab === "available"
            ? "Help vehicle owners who need roadside assistance."
            : "Requests assigned to your mechanic account."}
        </Text>
      </View>

      <View style={styles.tabs}>
        <TabButton
          title={`Available (${available.length})`}
          selected={activeTab === "available"}
          onPress={() => setActiveTab("available")}
        />
        <TabButton
          title={`Accepted (${accepted.length})`}
          selected={activeTab === "accepted"}
          onPress={() => setActiveTab("accepted")}
        />
      </View>

      {error ? (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle-outline" size={18} color="#B42318" />
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={refresh} accessibilityRole="button">
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={RED} />
          <Text style={styles.emptyText}>Loading SOS requests...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {requests.length ? (
            requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                accepted={activeTab === "accepted"}
                accepting={acceptingId === request.id}
                onAccept={() => acceptRequest(request)}
                onOpenLocation={() => void openLocation(request)}
              />
            ))
          ) : (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name={activeTab === "available" ? "car-outline" : "checkmark-done-outline"}
                  size={30}
                  color={RED}
                />
              </View>
              <Text style={styles.emptyTitle}>
                {activeTab === "available"
                  ? "No SOS requests right now"
                  : "No accepted requests yet"}
              </Text>
              <Text style={styles.emptyText}>
                {activeTab === "available"
                  ? "New owner requests will appear here. Pull down to refresh."
                  : "When you accept an SOS request, it will appear here."}
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function TabButton({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.tab, selected && styles.selectedTab]}
    >
      <Text style={[styles.tabText, selected && styles.selectedTabText]}>
        {title}
      </Text>
    </Pressable>
  );
}

function RequestCard({
  request,
  accepted,
  accepting,
  onAccept,
  onOpenLocation,
}: {
  request: MechanicSosRequest;
  accepted: boolean;
  accepting: boolean;
  onAccept: () => void;
  onOpenLocation: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.sosBadge}>
          <Ionicons name="alert-circle" size={15} color="#B42318" />
          <Text style={styles.sosBadgeText}>SOS</Text>
        </View>
        <Text style={styles.timeText}>{formatDate(request.created_at)}</Text>
      </View>

      <Text style={styles.vehicle}>
        {request.company} {request.model ?? ""}
      </Text>
      <Text style={styles.vehicleMeta}>
        {request.vehicle_type} · {request.power_type}
      </Text>

      <View style={styles.divider} />

      <InfoRow icon="construct-outline" label="Issue" value={request.issue} />
      {request.description ? (
        <InfoRow
          icon="chatbox-ellipses-outline"
          label="Details"
          value={request.description}
        />
      ) : null}
      <InfoRow
        icon="location-outline"
        label="Location"
        value={request.location_address}
      />
      {accepted && request.customer_name ? (
        <InfoRow
          icon="person-outline"
          label="Owner"
          value={`${request.customer_name}${request.customer_phone ? ` · ${request.customer_phone}` : ""}`}
        />
      ) : null}

      <Pressable
        accessibilityRole="button"
        onPress={onOpenLocation}
        style={styles.mapButton}
      >
        <Ionicons name="map-outline" size={17} color={RED} />
        <Text style={styles.mapText}>Open exact location</Text>
      </Pressable>

      {accepted ? (
        <View style={styles.acceptedBanner}>
          <Ionicons name="checkmark-circle" size={19} color="#25804A" />
          <Text style={styles.acceptedText}>You accepted this request</Text>
        </View>
      ) : (
        <Pressable
          accessibilityRole="button"
          onPress={onAccept}
          disabled={accepting}
          style={[styles.acceptButton, accepting && styles.disabledButton]}
        >
          {accepting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={19} color="#FFF" />
              <Text style={styles.acceptText}>Accept SOS request</Text>
            </>
          )}
        </Pressable>
      )}
    </View>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={17} color={RED} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "New request"
    : date.toLocaleString();
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F7F8" },
  header: {
    backgroundColor: RED,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 22,
  },
  overline: {
    color: "#FFDADA",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: { color: "#FFFFFF", fontSize: 25, fontWeight: "800", marginTop: 7 },
  subtitle: { color: "#FFEAEA", fontSize: 13, lineHeight: 19, marginTop: 5 },
  tabs: {
    flexDirection: "row",
    margin: 15,
    padding: 4,
    borderRadius: 12,
    backgroundColor: "#ECEDEF",
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 11, borderRadius: 9 },
  selectedTab: { backgroundColor: "#FFFFFF", elevation: 1 },
  tabText: { color: "#666666", fontSize: 13, fontWeight: "700" },
  selectedTabText: { color: RED },
  errorBanner: {
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 11,
    borderRadius: 10,
    backgroundColor: "#FFF0EF",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  errorText: { flex: 1, color: "#8F1D16", fontSize: 12 },
  retryText: { color: RED, fontSize: 12, fontWeight: "800" },
  list: { paddingHorizontal: 15, paddingBottom: 30, flexGrow: 1 },
  loading: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sosBadge: {
    backgroundColor: "#FFF0EF",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sosBadgeText: { color: "#B42318", fontSize: 11, fontWeight: "800" },
  timeText: { color: "#888888", fontSize: 11 },
  vehicle: { color: "#222222", fontSize: 18, fontWeight: "800" },
  vehicleMeta: { color: "#777777", fontSize: 12, marginTop: 4 },
  divider: { height: 1, backgroundColor: "#EEEEEE", marginVertical: 13 },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 11,
  },
  infoLabel: { width: 58, color: "#777777", fontSize: 12, fontWeight: "600" },
  infoValue: { flex: 1, color: "#333333", fontSize: 12, lineHeight: 18 },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    paddingVertical: 8,
    marginBottom: 5,
  },
  mapText: { color: RED, fontSize: 12, fontWeight: "700" },
  acceptButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: RED,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  disabledButton: { opacity: 0.6 },
  acceptText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  acceptedBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    padding: 11,
    marginTop: 8,
    backgroundColor: "#EAF7EE",
    borderRadius: 9,
  },
  acceptedText: { color: "#24663D", fontSize: 13, fontWeight: "700" },
  empty: { alignItems: "center", paddingHorizontal: 24, paddingTop: 65 },
  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: "#FFF0F0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  emptyTitle: {
    color: "#252525",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyText: {
    color: "#777777",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 7,
  },
});
