import { FlatList, Text, View } from "react-native";
import EmptyList from "../empty-list";
import VerticalTripCard from "../vertical-trip-card";
import VerticalTripCardSkeleton from "../vertical-trip-card/skeleton"; // Ajuste o caminho se necessário
import { useTodayTrips } from "./hooks/use-today-trips";
import { s } from "./styles";

type TodayTripsProps = {
  title: string;
  routeId: number;
};

const SKELETON_DATA = [1, 2, 3];

export default function TodayTrips({ title, routeId }: TodayTripsProps) {
  const { tripsPaginationData, isLoading } = useTodayTrips(routeId);

  const renderRealItem = ({ item }: { item: any }) => <VerticalTripCard trip={item} />
  const renderSkeletonItem = () => <VerticalTripCardSkeleton />;

  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>

      <FlatList
        style={s.listContainer}
        data={isLoading ? SKELETON_DATA : tripsPaginationData?.data}
        renderItem={isLoading ? renderSkeletonItem : renderRealItem}
        keyExtractor={(item, index) =>
          isLoading ? `skeleton-${index}` : String(item.id)
        }
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 22 }}
        ListEmptyComponent={
          <EmptyList
            title="Sem passagens"
            description="Infelizmente não foi possível encontrar nenhuma passagem com essa rota"
            width={360}
          />
        }
      />
    </View>
  );
}
