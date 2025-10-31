import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

const CARD_SIZE = 146

export const s = StyleSheet.create({
  container: {
    justifyContent: "center",
    textAlign: "center",
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: colors.bg.secondary,
    borderColor: colors.border.primary,
    borderWidth: 2,
    borderRadius: 18,
    padding: 11,
    gap: 4,
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
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.status.avaliable,
  },

  cardSkeleton: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: colors.bg.secondary,
    borderRadius: 18,
    padding: 12,
    justifyContent: 'space-around',
  },
  lineSkeleton: {
    marginBottom: 10,
  }
});
