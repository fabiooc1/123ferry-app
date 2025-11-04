import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  background: {
    backgroundColor: colors.bg.secondary,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  handle: {
    backgroundColor: colors.border.primary,
    width: 40,
  },
  contentContainer: {
    padding: 20,
    gap: 16,
    alignItems: 'center',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: colors.text.primary,
    textAlign: "center",
  },

  icon: {
    marginBottom: 8,
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  }
});