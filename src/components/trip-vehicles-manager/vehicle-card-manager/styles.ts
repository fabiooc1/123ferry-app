import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.bg.secondary,
        borderWidth: 2,
        borderColor: colors.border.primary,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 18,
        height: 56,

        alignItems: 'center',
        justifyContent: 'space-between'
    },
    startContainer: {
        gap: 2
    },
    vehicleModel: {
        color: colors.text.secondary,
        fontSize: 14,
        fontFamily: "Inter-Bold"
    },
    vehiclePlate: {
        color: colors.text.tertiary,
        fontSize: 12,
        fontFamily: "Inter-Bold"
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 6
    },
    actionButton: {
        padding: 2
    }
})