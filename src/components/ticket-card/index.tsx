import { colors } from "@/constants/colors";
import { TicketPaginationItem } from "@/models/TicketPaginationItem";
import { formatDateTime } from '@/utils/date';
import { Link } from "expo-router";
import { ArrowRightIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import { s } from "./styles";

interface TicketCardProps {
  ticket: TicketPaginationItem;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const { viagem } = ticket;
  const { rota } = viagem;

  return (
    <Link
      href={{
        pathname: "/(tabs)/purchase-details",
        params: {
          ticketCode: ticket.codigo,
        },
      }}
    >
      <View style={s.cardContainer}>
        <View style={s.row}>
          <Text style={s.dateTimeText}>
            {formatDateTime(viagem.dataPartida)}
          </Text>
          <Text style={s.dateTimeText}>
            {formatDateTime(viagem.dataChegada)}
          </Text>
        </View>

        <View style={s.portRow}>
          <Text style={[s.portNameText, s.textAlignLeft]}>{rota.origem.nome}</Text>
          <ArrowRightIcon
            size={24}
            color={colors.text.secondary}
            style={s.arrowIcon}
          />
          <Text style={[s.portNameText, s.textAlignRight]}>{rota.destino.nome}</Text>
        </View>

        <View style={s.row}>
          <Text style={s.labelText}>ORIGEM</Text>
          <Text style={s.labelText}>DESTINO</Text>
        </View>
      </View>
    </Link>
  );
}