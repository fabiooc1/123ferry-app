import { getHours } from "@/utils/date";
import { FlatList, Text, View } from "react-native";
import VerticalTripCard from "../vertical-trip-card";
import { useTodayTrips } from "./hooks/use-today-trips";
import { s } from "./styles";

type TodayTripsProps = {
  title: string;
  routeId: number;
};

export default function TodayTrips({ title, routeId }: TodayTripsProps) {
  const { tripsPaginationData } = useTodayTrips(routeId)

  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>

      {tripsPaginationData && (
        <FlatList
          style={s.listContainer}
          data={tripsPaginationData.data}
          renderItem={({ item, index }) => (
            <VerticalTripCard
              arrivalHour={getHours(item.dataPartida)}
              departureHour={getHours(item.dataChegada)}
              amountPassengers={item.quantidadeDePassageiros}
              ferry={{
                name: item.ferry.nome,
                maxPeoplesCapacity: item.ferry.maximoDePessoas,
              }}
            />
          )}
          keyExtractor={(item) => String(item.id)}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 22 }}
        />
      )}
    </View>
  );
}
