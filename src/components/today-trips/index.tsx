import { TripModel } from "@/models/TripModel";
import { FlatList, Text, View } from "react-native";
import EmptyList from "../empty-list";
import VerticalTripCard from "../vertical-trip-card";
import VerticalTripCardSkeleton from "../vertical-trip-card/skeleton";
import { s } from "./styles";

type TodayTripsProps = {
  routeName: string;
  trips: TripModel[] | null;
  isLoading: boolean;
};

const SKELETON_DATA = [1, 2, 3];

export default function TodayTrips({
  routeName,
  trips,
  isLoading,
}: TodayTripsProps) {
  const renderRealItem = ({ item }: { item: TripModel }) => (
    <VerticalTripCard trip={item} />
  );
  const renderSkeletonItem = () => <VerticalTripCardSkeleton />;

  return (
    <View style={s.container}>
      <Text style={s.title}>{routeName}</Text>

      <FlatList<any>
        style={s.listContainer}
        data={isLoading ? SKELETON_DATA : trips}
        renderItem={isLoading ? renderSkeletonItem : renderRealItem}
        keyExtractor={(item, index) =>
          isLoading ? `skeleton-${index}` : String((item as TripModel).id)
        }
        horizontal={true}
        ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 22 }}
        ListEmptyComponent={
          !isLoading && (!trips || trips.length === 0) ? (
            <EmptyList
              title="Sem passagens"
              description="Infelizmente não foi possível encontrar nenhuma passagem com essa rota"
              width={360}
            />
          ) : null
        }
      />
    </View>
  );
}