import { colors } from "@/constants/colors";
import { TicketStatus } from "@/models/TicketModel";
import { TicketVehicleModel } from "@/models/TicketVehicleModel";
import { formatCurrency } from "@/utils/money";
import { Accordion } from "@animatereactnative/accordion";
import { CaretDownIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import { s } from "./styles";

interface VehicleAccordionProps {
  ticketStatus: TicketStatus;
  vehicle: TicketVehicleModel;
}

export default function VehicleAccordion({
  ticketStatus,
  vehicle,
}: VehicleAccordionProps) {
  console.log(vehicle)

  return (
    <Accordion.Accordion style={s.container}>
      <Accordion.Header>
        <View style={s.header}>
          <Text style={s.headerTitle}>{vehicle.placa}</Text>

          <Accordion.HeaderIcon>
            <CaretDownIcon size={22} color={colors.text.secondary} />
          </Accordion.HeaderIcon>
        </View>
      </Accordion.Header>

      <Accordion.Expanded>
        <View style={s.expandedContent}>
          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Categoria</Text>
            <Text style={s.detailValue}>{vehicle.veiculoCategoria.nome}</Text>
          </View>

          {ticketStatus !== "RESERVADA" && vehicle.precoPagoEmCentavos && (
            <View style={s.detailRow}>
              <Text style={s.detailLabel}>Preço Pago</Text>
              <Text style={s.detailValue}>{formatCurrency(vehicle.precoPagoEmCentavos)}</Text>
            </View>
          )}

          <View style={s.detailRow}>
            <Text style={s.detailLabel}>Motorista</Text>
            <Text style={s.detailValue}>{vehicle.motorista.nomeCompleto}</Text>
          </View>
        </View>
      </Accordion.Expanded>
    </Accordion.Accordion>
  );
}