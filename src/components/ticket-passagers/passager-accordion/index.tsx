import { colors } from "@/constants/colors";
import { TicketStatus } from "@/models/TicketModel";
import { TicketPassagerModel } from "@/models/TicketPassagerModel";
import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/money";
import { Accordion } from "@animatereactnative/accordion";
import { CaretDownIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import { s } from "./stylets";

interface PassagerAccordionProps {
  ticketStatus: TicketStatus
  passager: TicketPassagerModel;
}

export default function PassagerAccordion({
  ticketStatus,
  passager,
}: PassagerAccordionProps) {
  console.log(passager)
  return (
    <Accordion.Accordion style={s.container}>
      <Accordion.Header>
        <View style={s.header}>
          <Text style={s.headerTitle}>{passager.nomeCompleto}</Text>

          <Accordion.HeaderIcon>
            <CaretDownIcon size={22} color={colors.text.secondary} />
          </Accordion.HeaderIcon>
        </View>
      </Accordion.Header>

      <Accordion.Expanded>
        <View style={s.expandedContent}>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Tipo</Text>
            <Text style={s.detailValue}>{passager.tipo.nome}</Text>
          </View>

          {ticketStatus !== "RESERVADA" && passager.precoPagoEmCentavos && (
            <View style={s.detailRow}>
            <Text style={s.detailLabel}>Preço Pago</Text>
            <Text style={s.detailValue}>{formatCurrency(passager.precoPagoEmCentavos)}</Text>
          </View>
          )}

          <View style={s.detailRow}>
            <Text style={s.detailLabel}>CPF</Text>
            <Text style={s.detailValue}>{passager.cpf}</Text>
          </View>

          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Data nascimento</Text>
            <Text style={s.detailValue}>{formatDate(passager.dataNascimento)}</Text>
          </View>
        </View>
      </Accordion.Expanded>
    </Accordion.Accordion>
  );
}
