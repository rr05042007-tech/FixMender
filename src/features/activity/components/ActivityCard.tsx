
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";
import Spacing from "../../../constants/spacing";
import Typography from "../../../constants/typrography";
import type { Activity } from "../types";

interface Props {
  activity: Activity;
}

export default function ActivityCard({ activity }: Props) {
  const statusColor =
    activity.status === "Completed"
      ? Colors.success
      : activity.status === "Cancelled"
        ? Colors.error
        : activity.status === "In Progress"
          ? Colors.info
          : Colors.warning;

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconBox}>
          <Ionicons
            name={
              activity.type === "SOS"
                ? "warning-outline"
                : "construct-outline"
            }
            size={24}
            color={Colors.primary}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.subtitle}>{activity.vehicleName}</Text>
          <Text style={styles.subtitle}>{activity.garageName}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{activity.date}</Text>
        </View>

        {activity.cost !== undefined && (
          <View>
            <Text style={styles.label}>Repair cost</Text>
            <Text style={styles.value}>₹{activity.cost}</Text>
          </View>
        )}

        <View style={[styles.badge, { backgroundColor: `${statusColor}18` }]}>
          <Text style={[styles.status, { color: statusColor }]}>
            {activity.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    padding: Spacing.cardPadding,
    borderRadius: Spacing.radiusLarge,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.cardGap,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: Spacing.radiusMedium,
    backgroundColor: Colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1 },
  title: {
    color: Colors.text,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.sm,
    marginTop: Spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.md,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: Typography.fontSize.xs,
  },
  value: {
    color: Colors.text,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    marginTop: Spacing.xs,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.radiusRound,
  },
  status: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semiBold,
  },
});
