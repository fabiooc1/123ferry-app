import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: colors.bg.secondary,
    borderWidth: 2,
    borderColor: colors.border.primary,
    borderRadius: 18,
    padding: 11,
  },
  startContainer: {
    flexDirection: "column",
    gap: 2,
  },
  departureHour: {
    fontSize: 24,
    fontFamily: "Inter-ExtraBold",
    color: colors.text.secondary,
  },
  arrivalHour: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: colors.text.secondary,
  },
  ferryName: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: colors.text.secondary,
  },
  rightContainer: {
    gap: 2,
  },
  passagersContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  passagersAmountText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.status.avaliable,
  },

  cardSkeleton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: colors.bg.secondary,
    borderWidth: 2,
    borderColor: colors.border.primary,
    borderRadius: 18,
    padding: 11,
    opacity: 0.5,
  },
  startSkeleton: {
    flexDirection: "column",
    gap: 2,
  },
  rightSkeleton: {
    gap: 2,
    alignItems: 'flex-end',
  },
  passagersSkeleton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});