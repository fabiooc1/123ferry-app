import { colors } from "@/constants/colors";
import { TicketStatus } from "@/models/TicketModel";
import { TicketPassagerModel } from "@/models/TicketPassagerModel";
import { StyleSheet, Text, View } from "react-native";
import PassagerAccordion from "./passager-accordion";

interface TicketPassagersProps {
    ticketStatus: TicketStatus
    passagers: TicketPassagerModel[]
}

export default function TicketPassagers({ ticketStatus, passagers }: TicketPassagersProps) {
    return (
        <View style={s.container}>
            <Text style={s.title}>Passageiros ({passagers.length})</Text>

            <View style={s.content}>
                {passagers.map(passager => (
                     <PassagerAccordion key={passager.cpf} ticketStatus={ticketStatus} passager={passager} />
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