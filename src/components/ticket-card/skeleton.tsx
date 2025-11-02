import { View } from "react-native";
import SkeletonPiece from "../skeleton-piece";
import { s } from "./styles";

export default function TicketCardSkeleton() {
  return (
    <View style={s.tripHeaderSkeletonContainer}>
      <View style={s.dateTimeRow}>
        <SkeletonPiece width={120} height={14} />
        <View style={s.arrowSkeleton} />
        <SkeletonPiece width={120} height={14} />
      </View>

      <View style={s.portNameRow}>
        <SkeletonPiece width={100} height={20} />
        <View style={{ width: 10 }} />
        <SkeletonPiece width={100} height={20} />
      </View>

      <View style={s.labelsRow}>
        <SkeletonPiece width={50} height={10} />
        <View style={{ width: 10 }} />
        <SkeletonPiece width={50} height={10} />
      </View>
    </View>
  );
}
