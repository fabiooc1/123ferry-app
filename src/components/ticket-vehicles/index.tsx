import { colors } from "@/constants/colors";
import { TicketStatus } from "@/models/TicketModel";
import { TicketVehicleModel } from "@/models/TicketVehicleModel";
import { StyleSheet, Text, View } from "react-native";
import VehicleAccordion from "./vehicle-accordian";

interface TicketPassagersProps {
    ticketStatus: TicketStatus
    vehicles: TicketVehicleModel[]
}

export default function TicketVehicles({ ticketStatus, vehicles }: TicketPassagersProps) {
    return (
        <View style={s.container}>
            <Text style={s.title}>Veículos ({vehicles.length})</Text>

            <View style={s.content}>
                {vehicles.map(vehicle => (
                    <VehicleAccordion key={vehicle.placa} ticketStatus={ticketStatus} vehicle={vehicle} />
                ))}
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        gap: 12
    },
    title: {
        fontSize: 16,
        fontFamily: "Inter-Bold",
        color: colors.text.secondary
    },
    content: {
        gap: 10
    }
})