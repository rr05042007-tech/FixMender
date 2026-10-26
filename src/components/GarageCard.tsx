
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors";
import Spacing from "../constants/spacing";
import Typography from "../constants/typrography";

export interface GarageCardData {
  id: string;
  name: string;
  address: string;
  rating?: number;
  distance?: string;
  category?: string;
  services?: string[];
  price?: string;
  image?: string;
  isOpen?: boolean;
}

interface GarageCardProps {
  garage: GarageCardData;
  onPress: (garage: GarageCardData) => void;
  onBookPress?: (garage: GarageCardData) => void;
  style?: ViewStyle;
}

export default function GarageCard({
  garage,
  onPress,
  onBookPress,
  style,
}: GarageCardProps) {
  return (
    <View style={[styles.card, style]}>
      {garage.image ? (
        <Image
          source={{ uri: garage.image }}
          style={styles.image}
          resizeMode="cover"
          accessibilityLabel={`${garage.name} garage`}
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons
            name="build-outline"
            size={36}
            color={Colors.primary}
          />
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {garage.name}
          </Text>

          {garage.isOpen !== undefined ? (
            <View
              style={[
                styles.statusBadge,
                garage.isOpen ? styles.openBadge : styles.closedBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  garage.isOpen ? styles.openText : styles.closedText,
                ]}
              >
                {garage.isOpen ? "Open" : "Closed"}
              </Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.address} numberOfLines={2}>
          <Ionicons
            name="location-outline"
            size={14}
            color={Colors.textSecondary}
          />{" "}
          {garage.address}
        </Text>

        <View style={styles.infoRow}>
          {garage.rating !== undefined ? (
            <View style={styles.infoItem}>
              <Ionicons
                name="star"
                size={15}
                color={Colors.rating}
              />
              <Text style={styles.infoText}>
                {garage.rating.toFixed(1)}
              </Text>
            </View>
          ) : null}

          {garage.distance ? (
            <View style={styles.infoItem}>
              <Ionicons
                name="navigate-outline"
                size={15}
                color={Colors.primary}
              />
              <Text style={styles.infoText}>
                {garage.distance}
              </Text>
            </View>
          ) : null}

          {garage.category ? (
            <Text style={styles.category} numberOfLines={1}>
              {garage.category}
            </Text>
          ) : null}
        </View>

        {garage.services && garage.services.length > 0 ? (
          <View style={styles.servicesRow}>
            {garage.services.slice(0, 3).map((service, index) => (
              <View key={`${service}-${index}`} style={styles.serviceChip}>
                <Text style={styles.serviceText} numberOfLines={1}>
                  {service}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        <View style={styles.bottomRow}>
          {garage.price ? (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Starting from</Text>
              <Text style={styles.price}>{garage.price}</Text>
            </View>
          ) : (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Repair services</Text>
              <Text style={styles.price}>Get a quote</Text>
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => onPress(garage)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={`View ${garage.name} details`}
            >
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>

            {onBookPress ? (
              <TouchableOpacity
                style={[
                  styles.bookButton,
                  garage.isOpen === false && styles.disabledButton,
                ]}
                onPress={() => onBookPress(garage)}
                disabled={garage.isOpen === false}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`Book service at ${garage.name}`}
              >
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Spacing.radiusLarge,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    marginBottom: Spacing.cardGap,
  },

  image: {
    width: "100%",
    height: 150,
    backgroundColor: Colors.backgroundLight,
  },

  imagePlaceholder: {
    height: 120,
    backgroundColor: Colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: Spacing.cardPadding,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },

  name: {
    flex: 1,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },

  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.radiusRound,
  },

  openBadge: {
    backgroundColor: "#E8F5E9",
  },

  closedBadge: {
    backgroundColor: Colors.sosBackground,
  },

  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semiBold,
  },

  openText: {
    color: Colors.success,
  },

  closedText: {
    color: Colors.error,
  },

  address: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.md,
    marginBottom: Spacing.md,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },

  infoText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text,
    fontWeight: Typography.fontWeight.medium,
  },

  category: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    flexShrink: 1,
  },

  servicesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },

  serviceChip: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: Spacing.radiusSmall,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },

  serviceText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.xs,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: Spacing.md,
  },

  priceContainer: {
    flex: 1,
  },

  priceLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },

  price: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },

  actions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },

  detailsButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Spacing.radiusMedium,
    alignItems: "center",
    justifyContent: "center",
  },

  detailsButtonText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
  },

  bookButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.radiusMedium,
    alignItems: "center",
    justifyContent: "center",
  },

  bookButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semiBold,
  },

  disabledButton: {
    opacity: 0.5,
  },
});
