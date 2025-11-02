import { colors } from "@/constants/colors";
import { TripModel } from "@/models/TripModel";
import { getHours } from "@/utils/date";
import { useRouter } from "expo-router";
import { UsersIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import Button from "../button";
import { s } from "./styles";

interface HorizontalTripCardProps {
  trip: TripModel;
}

export default function HorizontalTripCard({ trip }: HorizontalTripCardProps) {
  const navigate = useRouter()
  function handleOnPurchaseButtonClick() {
    navigate.push({
      pathname: "/(tabs)/(schedule-trip)/schedule-details",
        params: {
          tripId: trip.id.toString()
        }
    })
  }

  return (
    <View style={s.cardContainer}>
      <View style={s.startContainer}>
        <Text style={s.departureHour}>{getHours(trip.dataPartida)}</Text>
        <Text style={s.arrivalHour}>Chegada {getHours(trip.dataChegada)}</Text>
        <Text style={s.ferryName}>{trip.ferry.nome}</Text>
      </View>

      <View style={s.rightContainer}>
        <View style={s.passagersContainer}>
          <Text style={s.passagersAmountText}>
            {trip.quantidadeDePassageiros}/{trip.ferry.maximoDePessoas}
          </Text>

          <UsersIcon weight="fill" color={colors.icon.secondary} size={16} />
        </View>

        <Button size='small' label="Comprar" onPress={handleOnPurchaseButtonClick}></Button>
      </View>
    </View>
  );
}


