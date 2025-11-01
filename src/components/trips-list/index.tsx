import { TripsPaginationModel } from "@/models/TripsPaginationModel";
import { FlatList, View } from "react-native";
import EmptyList from "../empty-list";
import HorizontalTripCard from "../horizontal-trip-card";
import HorizontalTripCardSkeleton from "../horizontal-trip-card/skeleton";
import { s } from "./styles";

interface TripsListProps {
  isLoading: boolean;
  tripsPaginationData: TripsPaginationModel | null;
}

const SKELETON_DATA = [1, 2, 3, 4];

export default function TripsList({
  isLoading,
  tripsPaginationData,
}: TripsListProps) {
  const renderRealItem = ({ item }: { item: any }) => (
    <HorizontalTripCard trip={item} />
  );

  const renderSkeletonItem = () => <HorizontalTripCardSkeleton />;

  return (
    <FlatList
      style={s.listContainer}
      data={isLoading ? SKELETON_DATA : tripsPaginationData?.data}
      renderItem={isLoading ? renderSkeletonItem : renderRealItem}
      keyExtractor={(item, index) =>
        isLoading ? `skeleton-${index}` : String(item.id)
      }
      horizontal={false}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={
        tripsPaginationData && (
          <EmptyList
            title="Sem passagens"
            description="Infelizmente não foi possível encontrar nenhuma passagem com essa rota e data de partida"
            width={"100%"}
          />
        )
      }
    />
  );
}
