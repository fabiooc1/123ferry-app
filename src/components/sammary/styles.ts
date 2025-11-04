import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

const BASE_CONTAINER_STYLE = {
  gap: 18,
};

export const s = StyleSheet.create({
  cardContainer: {
    borderRadius: 18,
    backgroundColor: colors.bg.secondary,
    borderWidth: 2,
    borderColor: colors.border.primary,
    padding: 16,
    ...BASE_CONTAINER_STYLE,
  },
  container: {
    paddingBottom: 20,
    ...BASE_CONTAINER_STYLE,
  },
  secondaryContainer: {
    gap: 12,
  },
  secondaryTitle: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: colors.text.secondary,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  itemDetails: {
    flex: 1,
    marginRight: 8,
    gap: 2,
  },

  itemPrimaryText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: colors.text.secondary,
  },
  itemSecondaryText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: colors.text.tertiary,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.status.success,
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
    fontSize: 18,
    fontFamily: "Inter-ExtraBold",
    color: colors.text.secondary,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: "Inter-ExtraBold",
    color: colors.status.success,
  },
});