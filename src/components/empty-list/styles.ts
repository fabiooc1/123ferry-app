import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        backgroundColor: colors.bg.secondary,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border.primary,
        padding: 10,
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: colors.text.secondary
    },
    description: {
        fontSize: 12,
        fontFamily: 'Inter-Bold',
        color: colors.text.tertiary,
        textAlign: 'center'
    }
})