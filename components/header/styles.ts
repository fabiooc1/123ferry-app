import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 22,
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontFamily: "Inter-Bold",
        lineHeight: 36,
        fontSize: 16,
        color: colors.text.secondary
    },
})