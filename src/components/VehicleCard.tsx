
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import Typography from "../constants/typrography";

export interface VehicleCardData {
  id: string;
  name: string;
  company: string;
  model: string;
  category: string;
  powerType: "Electric" | "Non-Electric";
  registrationNumber?: string;
  fuelType?: string;
  isPrimary?: boolean;
}

interface VehicleCardProps {
  vehicle: VehicleCardData;
  onPress?: (vehicle: VehicleCardData) => void;
  onEdit?: (vehicle: VehicleCardData) => void;
  onDelete?: (vehicle: VehicleCardData) => void;
  style?: ViewStyle;
}

export default function VehicleCard({
  vehicle,
  onPress,
  onEdit,
  onDelete,
  style,
}: VehicleCardProps) {
  const isElectric = vehicle.powerType === "Electric";

  const vehicleIcon: keyof typeof Ionicons.glyphMap =
    vehicle.category.toLowerCase().includes("bike") ||
    vehicle.category.toLowerCase().includes("scooty")
      ? "bicycle-outline"
      : vehicle.category.toLowerCase().includes("truck") ||
          vehicle.category.toLowerCase().includes("heavy")
        ? "bus-outline"
        : "car-sport-outline";

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={onPress ? 0.8 : 1}
      onPress={() => onPress?.(vehicle)}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={`${vehicle.name}, ${vehicle.company} ${vehicle.model}`}
    >
      <View style={styles.topRow}>
        <View style={styles.vehicleIconContainer}>
          <Ionicons
            name={vehicleIcon}
            size={32}
            color={Colors.primary}
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.vehicleName} numberOfLines={1}>
            {vehicle.name}
          </Text>

          <Text style={styles.vehicleModel} numberOfLines={1}>
            {vehicle.company} {vehicle.model}
          </Text>
        </View>

        {vehicle.isPrimary ? (
          <View style={styles.primaryBadge}>
            <Ionicons
              name="checkmark-circle"
              size={13}
              color={Colors.success}
            />
            <Text style={styles.primaryText}>Primary</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Vehicle type</Text>
          <Text style={styles.detailValue}>
            {vehicle.category}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Power type</Text>
          <View style={styles.powerTypeRow}>
            <Ionicons
              name={isElectric ? "flash" : "water-outline"}
              size={14}
              color={isElectric ? Colors.success : Colors.textSecondary}
            />
            <Text style={styles.detailValue}>
              {vehicle.powerType}
            </Text>
          </View>
        </View>
      </View>

      {vehicle.registrationNumber ? (
        <View style={styles.registrationContainer}>
          <Ionicons
            name="card-outline"
            size={17}
            color={Colors.textSecondary}
          />
          <Text style={styles.registrationLabel}>Registration:</Text>
          <Text style={styles.registrationValue}>
            {vehicle.registrationNumber}
          </Text>
        </View>
      ) : null}

      {vehicle.fuelType ? (
        <View style={styles.fuelContainer}>
          <Ionicons
            name="speedometer-outline"
            size={16}
            color={Colors.textSecondary}
          />
          <Text style={styles.fuelText}>
            {vehicle.fuelType}
          </Text>
        </View>
      ) : null}

      {(onEdit || onDelete) ? (
        <View style={styles.actionsRow}>
          {onEdit ? (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onEdit(vehicle)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={`Edit ${vehicle.name}`}
            >
              <Ionicons
                name="create-outline"
                size={17}
                color={Colors.primary}
              />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          ) : null}

          {onDelete ? (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(vehicle)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={`Delete ${vehicle.name}`}
            >
              <Ionicons
                name="trash-outline"
                size={17}
                color={Colors.error}
              />
              <Text style={styles.deleteButtonText}>Remove</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    marginBottom: Spacing.cardGap,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },

  vehicleIconContainer: {
    width: 58,
    height: 58,
    borderRadius: Spacing.radiusMedium,
    backgroundColor: Colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    flex: 1,
    minWidth: 0,
  },

  vehicleName: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },

  vehicleModel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },

  primaryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    backgroundColor: "#E8F5E9",
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.radiusRound,
  },

  primaryText: {
    color: Colors.success,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semiBold,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.lg,
  },

  detailsRow: {
    flexDirection: "row",
    gap: Spacing.lg,
  },

  detailItem: {
    flex: 1,
  },

  detailLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },

  detailValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text,
  },

  powerTypeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },

  registrationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },

  registrationLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },

  registrationValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
    fontWeight: Typography.fontWeight.semiBold,
  },

  fuelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },

  fuelText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.sm,
    marginTop: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Spacing.radiusMedium,
  },

  editButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
  },

  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: Spacing.radiusMedium,
  },

  deleteButtonText: {
    color: Colors.error,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
  },
});
