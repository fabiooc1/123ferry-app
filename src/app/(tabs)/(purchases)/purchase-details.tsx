import Button from "@/components/button";
import Header from "@/components/header";
import InfoItem from "@/components/info-item";
import Line from "@/components/Line";
import ConfirmationBottomSheetModal from "@/components/modals/confirmation-bottom-sheet-modal";
import PageContentLoading from "@/components/page-content-loading";
import Tag, { TagVariant } from "@/components/Tag";
import TicketPassagers from "@/components/ticket-passagers";
import TicketVehicles from "@/components/ticket-vehicles";
import TicketSammary from "@/components/TicketSammary";
import { colors } from "@/constants/colors";
import { TicketModel } from "@/models/TicketModel";
import { ticketService } from "@/services/ticketService";
import { formatDate, formatDateTime, getHours } from "@/utils/date";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BoatIcon } from "phosphor-react-native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PurchaseDetailsScreen() {
  const confirmationModalRef = useRef<BottomSheetModal>(null);
  const { ticketCode }: { ticketCode: string } = useLocalSearchParams();
  const navigate = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [ticket, setTicket] = useState<TicketModel | null>(null);

  useEffect(() => {
    setIsLoading(true);
    ticketService
      .get(ticketCode)
      .then((ticketData) => {
        setTicket(ticketData);
      })
      .catch(() => {
        navigate.replace("/(tabs)/purchases");
      })
      .finally(() => setIsLoading(false));

    return () => setTicket(null);
  }, [ticketCode, navigate]);

  if (isLoading) {
    return <PageContentLoading />;
  }

  if (!ticket) {
    return null;
  }

  async function handleOnCancelTicket() {}

  const statusTags = {
    RESERVADA: "info",
    PAGA: "success",
    CANCELADA: "danger",
  };

  return (
    <>
      <SafeAreaView style={s.pageContainer}>
        <Header />

        <ScrollView
          style={s.scrollContainer}
          contentContainerStyle={s.scrollContentContainer}
        >
          <View style={s.ticketContainer}>
            <View style={[s.startTicketSection, s.ticketSection]}>
              <View style={s.routerContainer}>
                <Text style={s.routeCity}>
                  {ticket.viagem.rota.origem.cidade}
                </Text>

                <Text style={s.routeTime}>
                  {getHours(ticket.viagem.dataPartida)}
                </Text>
              </View>

              <View style={s.centerContainer}>
                <BoatIcon size={28} color={colors.text.primary} />
                <Tag
                  variant={statusTags[ticket.status] as TagVariant}
                  label={ticket.status}
                />
              </View>

              <View style={s.routerContainer}>
                <Text style={[s.routeCity, s.alignRight]}>
                  {ticket.viagem.rota.destino.cidade}
                </Text>

                <Text style={[s.routeTime, s.alignRight]}>
                  {getHours(ticket.viagem.dataChegada)}
                </Text>
              </View>
            </View>

            <Line borderType="dashed" marginHorizontal={22} />

            <View style={s.ticketSection}>
              <View style={s.gridInfos}>
                <View style={s.row}>
                  <InfoItem title="Código" value={ticket.codigo} />
                  <InfoItem title="Ferry" value={ticket.viagem.ferry.nome} />
                  <InfoItem
                    title="Reservada em"
                    value={formatDateTime(ticket.reservadaEm)}
                  />
                </View>

                <View style={s.row}>
                  <InfoItem
                    title="Data Partida"
                    value={formatDate(ticket.viagem.dataPartida)}
                  />

                  <InfoItem
                    title="Data Chegada"
                    value={formatDate(ticket.viagem.dataChegada)}
                  />

                  {ticket.status === "CANCELADA" && ticket.canceladaEm && (
                    <InfoItem
                      title="Cancelada em"
                      value={formatDateTime(ticket.canceladaEm)}
                    />
                  )}
                </View>

                <View style={s.row}>
                  {ticket.status === "PAGA" && ticket.pagaEm && (
                    <InfoItem
                      title="Paga em"
                      value={formatDateTime(ticket.pagaEm)}
                    />
                  )}
                </View>
              </View>
            </View>

            <Line borderType="dashed" marginHorizontal={22} />

            <View style={s.ticketSection}>
              <TicketPassagers passagers={ticket.passageiros} />
              <TicketVehicles vehicles={ticket.veiculos} />
            </View>

            {ticket.status === "PAGA" && ticket.pagaEm && (
              <>
              <Line borderType="dashed" marginHorizontal={22} />
              <TicketSammary passagers={ticket.passageiros} vehicles={ticket.veiculos} />
              </>
            )}
          </View>
        </ScrollView>

        {ticket.status === "RESERVADA" && (
          <View style={s.footerContainer}>
            <Button
              label="Cancelar passagem"
              variant="danger"
              onPress={() => confirmationModalRef.current?.present()}
            />
          </View>
        )}
      </SafeAreaView>

      <ConfirmationBottomSheetModal
        ref={confirmationModalRef}
        title="Cancelar passagem"
        description="Você realmente deseja cancelar essa passagem? Lembrando que essa ação é irreversível, você tera que comprar uma nova passagem."
        onConfirm={handleOnCancelTicket}
      />
    </>
  );
}

const s = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 22,
    paddingBottom: 20,
    gap: 26,
  },
  ticketContainer: {
    backgroundColor: colors.bg.primary,
    borderRadius: 18,
    borderColor: colors.border.primary,
    borderWidth: 2,
  },
  ticketSection: {
    padding: 22,
    gap: 12,
  },
  startTicketSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  routerContainer: {
    flex: 1,
    gap: 4,
  },
  routeCity: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.text.primary,
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
  },
  gridInfos: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  footerContainer: {
    padding: 22,
    backgroundColor: colors.bg.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
});
