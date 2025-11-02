import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    borderRadius: 18,
    backgroundColor: colors.bg.secondary,
    borderWidth: 2,
    borderColor: colors.border.primary,
    padding: 12,
    gap: 6,
  },
  secondaryContainer: {
    gap: 8,
  },
  secondaryTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: colors.text.secondary,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  type: {
    flex: 1,
    marginRight: 8,
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.text.tertiary,
  },
  typePrice: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.status.avaliable,
    flexShrink: 0,
  },

  footerContainer: {
    gap: 8,
  },
  footerTexts: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total: {
    fontSize: 20,
    fontFamily: "Inter-ExtraBold",
    color: colors.text.secondary,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: "Inter-ExtraBold",
    color: colors.status.avaliable,
  },
});