import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 12,
    },
    title: {
        fontSize: 20,
        color: colors.text.secondary,
        fontWeight: "700",
        lineHeight: 36,
        paddingLeft: 22
    },
    listContainer: {
        height: 146,
        width: '100%'
    }
})