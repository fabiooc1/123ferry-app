import { colors } from "@/constants/colors";
import { formatDate, getHours } from "@/utils/date";
import { BoatIcon } from "phosphor-react-native";
import { StyleSheet, Text, View } from "react-native";
import Tag, { TagVariant } from "../Tag";

interface TicketRouterProps {
  presentation: "trip" | "ticket";
  status?: keyof typeof statusTags;
  departure: {
    city: string;
    dataPartida: string;
  };
  arrival: {
    city: string;
    dataChegada: string;
  };
}

const statusTags = {
  RESERVADA: "info",
  PAGA: "success",
  CANCELADA: "danger",
};

export default function TicketRouter({
  presentation,
  status,
  departure,
  arrival,
}: TicketRouterProps) {
  return (
    <View style={presentation === "trip" ? s.tripContainer : s.ticketContainer}>
      <View style={{ flex: 1 }}>
        <Text style={s.routeCity}>{departure.city}</Text>
        <Text style={s.routeTime}>{getHours(departure.dataPartida)}</Text>
      </View>

      <View style={s.centerContainer}>
        <BoatIcon size={28} color={colors.text.primary} />
        {presentation === "ticket" && status ? (
          <Tag
            variant={statusTags[status] as TagVariant}
            label={status}
          />
        ) : (
          <Text style={s.tripDataText}>
            {formatDate(departure.dataPartida)}
          </Text>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[s.routeCity, s.alignRight]}>{arrival.city}</Text>

        <Text style={[s.routeTime, s.alignRight]}>
          {getHours(arrival.dataChegada)}
        </Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  tripContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 22,
    backgroundColor: colors.bg.secondary,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.primary,
    gap: 8,
  },
  ticketContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 22,
    gap: 8,
  },
  tripDataText: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: colors.text.tertiary,
  },
  routeCity: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.text.primary,
    flexWrap: "wrap",
  },
  routeTime: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.text.secondary,
  },
  alignRight: {
    textAlign: "right",
  },
  centerContainer: {
    gap: 8,
    alignItems: "center",
    flexShrink: 0,
  },
});