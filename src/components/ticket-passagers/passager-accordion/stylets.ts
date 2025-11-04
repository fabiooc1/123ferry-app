import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.secondary,
    borderColor: colors.border.primary,
    borderWidth: 2,

    borderRadius: 12,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    flex: 1,
    paddingRight: 10,
  },
  expandedContent: {
    padding: 16,
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailLabel: {
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
  detailValue: {
    color: colors.text.secondary,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
});