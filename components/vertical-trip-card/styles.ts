import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        justifyContent: "center",
        textAlign: "center",
        width: 146,
        height: 146,
        backgroundColor: colors.bg.secondary,
        borderColor: colors.border.primary,
        borderWidth: 2,
        borderRadius: 18,
        padding: 11,
        gap: 4
    },
    startContainer: {
        flexDirection: 'column',
        gap: 2,
    },
    departureHour: {
        fontSize: 24,
        fontWeight: '800',
        color: colors.text.secondary
    },
    arrivalHour: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text.secondary
    },
    ferryName: {
        fontSize: 12,
        fontWeight: '500',
        color: colors.text.secondary
    },
    footerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    footerLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.status.avaliable
    }
})