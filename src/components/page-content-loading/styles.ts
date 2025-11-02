import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg.primary,
  },
});
