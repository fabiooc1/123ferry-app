import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 18,
    backgroundColor: colors.bg.secondary,
    borderWidth: 2,
    borderColor: colors.border.primary,
    gap: 10,
  },
  startContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  startContainerTitle: {
    color: colors.text.secondary,
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
});