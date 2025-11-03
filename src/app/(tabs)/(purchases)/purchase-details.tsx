import Button from "@/components/button";
import ConfirmationBottomSheetModal from "@/components/confirmation-bottom-sheet-modal";
import Header from "@/components/header";
import PageContentLoading from "@/components/page-content-loading";
import TicketPassagers from "@/components/ticket-passagers";
import TicketVehicles from "@/components/ticket-vehicles";
import { colors } from "@/constants/colors";
import { TicketModel } from "@/models/TicketModel";
import { ticketService } from "@/services/ticketService";
import { getHours } from "@/utils/date";
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
 }, [ticketCode, navigate]);

 if (isLoading) {
  return <PageContentLoading />;
 }

 if (!ticket) {
  return null;
 }

 async function handleOnCancelTicket() {}

 const splitedRouteName = ticket.viagem.rota.nome.split("->");
 const departureCityName = splitedRouteName[0];
 const arrivalCityName = splitedRouteName[1];

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
        <Text style={s.routeCity}>{departureCityName}</Text>
        <Text style={s.routeTime}>
         {getHours(ticket.viagem.dataPartida)}
        </Text>
       </View>

       <View style={s.centerContainer}>
        <BoatIcon size={28} color={colors.text.primary} />
        {/* <View style={[s.statusBadge, statusStyle.container]}>
         <Text style={[s.statusBadgeText, statusStyle.text]}>
          {statusStyle.label}
         </Text>
        </View> */}
       </View>

       <View style={s.routerContainer}>
        <Text style={[s.routeCity, s.alignRight]}>
         {arrivalCityName}
        </Text>
        <Text style={[s.routeTime, s.alignRight]}>
         {getHours(ticket.viagem.dataChegada)}
        </Text>
       </View>
      </View>

      <View style={s.perforatedLine} />

       <View style={s.ticketSection}>
        
       </View>

      <View style={s.perforatedLine} />

      <View style={s.ticketSection}>
        <TicketPassagers passagers={ticket.passageiros} />
        <TicketVehicles vehicles={ticket.veiculos} />
      </View>
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
  backgroundColor: colors.bg.secondary,
  borderRadius: 18,
  borderColor: colors.border.primary,
  borderWidth: 2,
 },
 ticketSection: {
  padding: 24,
  gap: 8
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
  fontSize: 22,
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
 statusBadge: {
  paddingVertical: 4,
  paddingHorizontal: 12,
  borderRadius: 20,
  borderWidth: 1,
 },
 statusBadgeText: {
  fontSize: 12,
  fontWeight: "bold",
 },
 perforatedLine: {
  height: 2,
  borderStyle: "dashed",
  borderWidth: 1,
  borderColor: colors.border.primary,
  marginHorizontal: 24,
 },
 footerContainer: {
  padding: 22,
  backgroundColor: colors.bg.primary,
  borderTopWidth: 1,
  borderTopColor: colors.border.primary,
 },
});
