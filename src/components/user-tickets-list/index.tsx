import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import EmptyList from "../empty-list";
import TicketCard from "../ticket-card";
import TicketCardSkeleton from "../ticket-card/skeleton";
import { useUserTickets } from "./hooks/use-user-tickets";
import { s } from "./styles";

const SKELETON_DATA = [1, 2, 3, 4, 5]

export default function UserTicketsList() {
  const { isLoading, ticketsPaginationData } = useUserTickets()

  const renderRealItem = ({ item }: { item: any }) => <TicketCard ticket={item} />;

  const renderSkeletonItem = () => <TicketCardSkeleton />;

  return (
    <FlatList
      style={s.listContainer}
      data={isLoading ? SKELETON_DATA : ticketsPaginationData?.data}
      renderItem={isLoading ? renderSkeletonItem : renderRealItem}
      keyExtractor={(item, index) =>
        isLoading ? `skeleton-${index}` : String(item.id)
      }
      horizontal={false}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={
        ticketsPaginationData && (
          <EmptyList
            title="Sem passagens"
            description="Parece que você ainda não adquiriu nenhuma passagem, Adquira agora mesmo clicando no botão abaixo:"
            width={"100%"}
          />
        )
      }
    />
  );
}
