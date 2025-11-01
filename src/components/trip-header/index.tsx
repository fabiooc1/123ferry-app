import { TripModel } from "@/models/TripModel";
import { getHours } from "@/utils/date";
import { Text, View } from "react-native";
import { s } from "./styles";

interface TripHeaderProps {
    title: string
    trip: TripModel
}

export default function TripHeader({ title, trip }: TripHeaderProps) {
    return (
        <View style={s.container}>
            <Text style={s.title}>{title}</Text>
            <Text style={s.route}>{trip.rota.nome}</Text>
            <View style={s.rightContainer}>
                <Text style={s.hours}>{getHours(trip.dataPartida)} {'->'} {getHours(trip.dataChegada)}</Text>
                <Text style={s.ferryName}>{trip.ferry.nome}</Text>
            </View>
        </View>
    )
}