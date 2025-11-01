import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        padding: 16,
        borderWidth: 2,
        borderColor: colors.border.primary,
        backgroundColor: colors.bg.secondary,
        gap: 6,
        borderRadius: 18
    },
    title : {
        fontSize: 24,
        fontFamily: 'Inter-ExtraBold',
        color: colors.text.primary
    },
    route: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: colors.text.secondary
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    hours: {
        fontSize: 20,
        fontFamily: 'Inter-SemiBold',
        color: colors.text.secondary
    },
    ferryName: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: colors.text.tertiary
    }
})