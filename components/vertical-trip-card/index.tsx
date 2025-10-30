import { colors } from "@/constants/colors";
import { UsersIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import { s } from "./styles";

type VerticalTripCardProps = {
  departureHour: string;
  arrivalHour: string;
  ferry: {
    name: string;
    maxPeoplesCapacity: number;
  };
  amountPassengers: number;
};

export default function VerticalTripCard({
  departureHour,
  arrivalHour,
  ferry,
  amountPassengers,
}: VerticalTripCardProps) {
  return (
    // <Link href="/" asChild>
      <View style={s.container}>
        <View style={s.startContainer}>
            <Text style={s.departureHour}>{departureHour}</Text>
            <Text style={s.arrivalHour}>Chegada {arrivalHour}</Text>
            <Text style={s.ferryName}>{ferry.name}</Text>
        </View>

        <View style={s.footerContainer}>
          <Text style={s.footerLabel}>
            {amountPassengers}/{ferry.maxPeoplesCapacity}
          </Text>

          <UsersIcon weight="fill" color={colors.icon.secondary} size={16} />
        </View>
      </View>
    // </Link>
  );
}
