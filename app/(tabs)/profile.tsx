
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
const WHITE = "#FFFFFF";
const DARK = "#222222";
const GRAY = "#777777";
const BG = "#FAFAFA";
const LIGHT_RED = "#FFF0F0";
const BORDER = "#EEEEEE";

export default function ProfileScreen() {
  const router = useRouter();

  const [name, setName] = useState("FixMender User");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [editing, setEditing] = useState(false);

  const saveProfile = () => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter your name.");
      return;
    }

    setEditing(false);
    Alert.alert("Profile", "Your changes are saved for this session.");
  };

  const showComingSoon = (feature: string) => {
    Alert.alert(feature, `${feature} screen will be available soon.`);
  };

  const confirmLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => router.replace("/(auth)/login" as never),
      },
    ]);
  };

  const MenuItem = ({
    icon,
    title,
    subtitle,
    onPress,
    danger = false,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    onPress: () => void;
    danger?: boolean;
  }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View
        style={[
          styles.menuIcon,
          danger && { backgroundColor: "#FFF0F0" },
        ]}
      >
        <Ionicons
          name={icon}
          size={21}
          color={danger ? RED : RED}
        />
      </View>

      <View style={styles.menuText}>
        <Text style={[styles.menuTitle, danger && { color: RED }]}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        ) : null}
      </View>

      <Ionicons name="chevron-forward" size={19} color={GRAY} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={RED} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Text style={styles.headerSubtitle}>
            Manage your account and vehicles
          </Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color={RED} />
            </View>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() =>
                showComingSoon("Change Profile Picture")
              }
            >
              <Ionicons name="camera" size={16} color={WHITE} />
            </TouchableOpacity>
          </View>

          {editing ? (
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor={GRAY}
              maxLength={60}
            />
          ) : (
            <Text style={styles.profileName}>{name}</Text>
          )}

          <Text style={styles.memberLabel}>FixMender Member</Text>

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Vehicles</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Ionicons name="shield-checkmark" size={20} color={RED} />
              <Text style={styles.statLabel}>Account</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <TouchableOpacity
              onPress={() => {
                if (editing) {
                  saveProfile();
                } else {
                  setEditing(true);
                }
              }}
            >
              <Text style={styles.editText}>
                {editing ? "Save" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="person-outline"
                  size={19}
                  color={RED}
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Full Name</Text>
                {editing ? (
                  <TextInput
                    style={styles.infoInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    placeholderTextColor={GRAY}
                  />
                ) : (
                  <Text style={styles.infoValue}>{name}</Text>
                )}
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="call-outline"
                  size={19}
                  color={RED}
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone Number</Text>
                {editing ? (
                  <TextInput
                    style={styles.infoInput}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Enter phone number"
                    placeholderTextColor={GRAY}
                    keyboardType="phone-pad"
                    maxLength={15}
                  />
                ) : (
                  <Text style={styles.infoValue}>
                    {phone || "Add your phone number"}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.infoDivider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="mail-outline"
                  size={19}
                  color={RED}
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email Address</Text>
                {editing ? (
                  <TextInput
                    style={styles.infoInput}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter email address"
                    placeholderTextColor={GRAY}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                ) : (
                  <Text style={styles.infoValue}>
                    {email || "Add your email address"}
                  </Text>
                )}
              </View>
            </View>

            {editing && (
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveProfile}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Vehicle Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Vehicles</Text>

          <TouchableOpacity
            style={styles.vehicleCard}
            onPress={() => showComingSoon("My Vehicles")}
            activeOpacity={0.8}
          >
            <View style={styles.vehicleIcon}>
              <Ionicons
                name="car-sport-outline"
                size={28}
                color={RED}
              />
            </View>

            <View style={styles.vehicleText}>
              <Text style={styles.vehicleTitle}>Your Garage</Text>
              <Text style={styles.vehicleSubtitle}>
                Add and manage cars, bikes and EVs
              </Text>
            </View>

            <View style={styles.addButton}>
              <Ionicons name="add" size={22} color={WHITE} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <View style={styles.menuCard}>
            <MenuItem
              icon="calendar-outline"
              title="My Bookings"
              subtitle="View repair appointments"
              onPress={() => router.push("/(tabs)/bookings" as never)}
            />

            <View style={styles.menuDivider} />

            <MenuItem
              icon="time-outline"
              title="Activity History"
              subtitle="Your recent activity"
              onPress={() => router.push("/(tabs)/activity" as never)}
            />

            <View style={styles.menuDivider} />

            <MenuItem
              icon="location-outline"
              title="Saved Addresses"
              subtitle="Manage your service locations"
              onPress={() => showComingSoon("Saved Addresses")}
            />

            <View style={styles.menuDivider} />

            <MenuItem
              icon="notifications-outline"
              title="Notifications"
              subtitle="Manage your alerts"
              onPress={() => showComingSoon("Notifications")}
            />

            <View style={styles.menuDivider} />

            <MenuItem
              icon="lock-closed-outline"
              title="Privacy & Security"
              subtitle="Manage account security"
              onPress={() => showComingSoon("Privacy & Security")}
            />
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <View style={styles.menuCard}>
            <MenuItem
              icon="help-circle-outline"
              title="Help Centre"
              subtitle="Get help with FixMender"
              onPress={() => showComingSoon("Help Centre")}
            />

            <View style={styles.menuDivider} />

            <MenuItem
              icon="chatbubble-ellipses-outline"
              title="Contact Support"
              subtitle="Talk to our support team"
              onPress={() => showComingSoon("Contact Support")}
            />

            <View style={styles.menuDivider} />

            <MenuItem
              icon="information-circle-outline"
              title="About FixMender"
              subtitle="Version 1.0.0"
              onPress={() =>
                Alert.alert(
                  "FixMender",
                  "Your vehicle repair and roadside assistance companion."
                )
              }
            />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={confirmLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={21} color={RED} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Made with care by FixMender{"\n"}Version 1.0.0
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
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 54,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
  headerTitle: {
    color: WHITE,
    fontSize: 25,
    fontWeight: "800",
  },
  headerSubtitle: {
    color: "#F5DADA",
    fontSize: 12,
    marginTop: 6,
  },
  profileCard: {
    backgroundColor: WHITE,
    marginHorizontal: 20,
    marginTop: -35,
    borderRadius: 22,
    alignItems: "center",
    padding: 20,
    borderWidth: 1,
    borderColor: BORDER,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 91,
    height: 91,
    borderRadius: 46,
    backgroundColor: LIGHT_RED,
    borderWidth: 3,
    borderColor: "#F2D1D1",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraButton: {
    position: "absolute",
    right: -1,
    bottom: 1,
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: RED,
    borderWidth: 2,
    borderColor: WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    color: DARK,
    fontSize: 19,
    fontWeight: "800",
    textAlign: "center",
  },
  nameInput: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 190,
    color: DARK,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  memberLabel: {
    color: GRAY,
    fontSize: 12,
    marginTop: 5,
  },
  profileStats: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 22,
    paddingTop: 17,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    color: RED,
    fontSize: 18,
    fontWeight: "800",
  },
  statLabel: {
    color: GRAY,
    fontSize: 11,
    marginTop: 5,
  },
  statDivider: {
    height: 31,
    width: 1,
    backgroundColor: BORDER,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: DARK,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },
  editText: {
    color: RED,
    fontSize: 13,
    fontWeight: "800",
  },
  infoCard: {
    backgroundColor: WHITE,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: LIGHT_RED,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: GRAY,
    fontSize: 11,
    marginBottom: 5,
  },
  infoValue: {
    color: DARK,
    fontSize: 13,
    fontWeight: "600",
  },
  infoInput: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 8,
    color: DARK,
    fontSize: 13,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  infoDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginLeft: 54,
  },
  saveButton: {
    backgroundColor: RED,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
  },
  saveButtonText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: "800",
  },
  vehicleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    padding: 15,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: BORDER,
  },
  vehicleIcon: {
    width: 53,
    height: 53,
    borderRadius: 15,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleText: {
    flex: 1,
    marginLeft: 12,
  },
  vehicleTitle: {
    color: DARK,
    fontSize: 14,
    fontWeight: "800",
  },
  vehicleSubtitle: {
    color: GRAY,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 5,
  },
  addButton: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: RED,
    justifyContent: "center",
    alignItems: "center",
  },
  menuCard: {
    backgroundColor: WHITE,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  menuIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: LIGHT_RED,
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  menuTitle: {
    color: DARK,
    fontSize: 13,
    fontWeight: "700",
  },
  menuSubtitle: {
    color: GRAY,
    fontSize: 10,
    marginTop: 4,
  },
  menuDivider: {
    height: 1,
    backgroundColor: BORDER,
    marginLeft: 55,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 27,
    backgroundColor: WHITE,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#F0D4D4",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  logoutText: {
    color: RED,
    fontSize: 14,
    fontWeight: "800",
  },
  footer: {
    color: GRAY,
    fontSize: 10,
    textAlign: "center",
    lineHeight: 17,
    marginTop: 20,
    marginBottom: 30,
  },
});
