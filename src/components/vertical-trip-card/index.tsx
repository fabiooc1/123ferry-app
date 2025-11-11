import { colors } from "@/constants/colors";
import { TripModel } from "@/models/TripModel";
import { getHours } from "@/utils/date";
import { Link } from "expo-router";
import { UsersIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import { s } from "./styles";

type VerticalTripCardProps = {
  trip: TripModel
};

export default function VerticalTripCard({
  trip
}: VerticalTripCardProps) {
  
  return (
    <Link
      href={{
        pathname: "/(tabs)/schedule-details",
        params: {
          tripParamId: trip.id.toString()
        }
      }}
    >
      <View style={s.container}>
        <View style={s.startContainer}>
          <Text style={s.departureHour}>{getHours(trip.dataPartida)}</Text>
          <Text style={s.arrivalHour}>Chegada {getHours(trip.dataChegada)}</Text>
          <Text style={s.ferryName}>{trip.ferry.nome}</Text>
        </View>

        <View style={s.footerContainer}>
          <Text style={s.footerLabel}>
            {trip.quantidadeDePassageiros}/{trip.ferry.maximoDePessoas}
          </Text>

          <UsersIcon weight="fill" color={colors.icon.secondary} size={16} />
        </View>
      </View>
    </Link>
  );
}