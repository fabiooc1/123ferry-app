import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.bg.secondary,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.border.primary,
    padding: 16,
    marginHorizontal: 1,
    marginVertical: 8,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  portRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 4,
  },
  dateTimeText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: colors.text.tertiary,
  },
  portNameText: {
    flex: 1,
    fontFamily: "Inter-Bold",
    fontSize: 22,
    color: colors.text.secondary,
  },
  textAlignLeft: {
    textAlign: "left",
  },
  textAlignRight: {
    textAlign: "right",
  },
  arrowIcon: {
    marginHorizontal: 12,
  },
  labelText: {
    fontFamily: "Inter-Regular",
    fontSize: 10,
    color: colors.text.tertiary,
    letterSpacing: 0.5,
  },
  tripHeaderSkeletonContainer: {
    borderRadius: 18,
    backgroundColor: colors.bg.secondary,
    borderWidth: 2,
    borderColor: colors.border.primary,
    padding: 12,
    gap: 8,
    alignItems: "center",
  },
  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  portNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 4,
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 2,
  },
  arrowSkeleton: {
    width: 20,
    height: 10,
    backgroundColor: colors.bg.primary,
    borderRadius: 4,
    marginHorizontal: 10,
  },
});
