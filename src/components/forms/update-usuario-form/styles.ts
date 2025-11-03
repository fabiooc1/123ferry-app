import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "space-between",
    gap: 12,
  },
  formFields: {
    gap: 12,
    paddingHorizontal: 22,
    paddingBottom: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 22,
  },
  footerContainer: {
    padding: 22,
    backgroundColor: colors.bg.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
});