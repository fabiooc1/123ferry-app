import Button from "@/components/button";
import ConfirmationBottomSheetModal from "@/components/confirmation-bottom-sheet-modal";
import Header from "@/components/header";
import PageContentLoading from "@/components/page-content-loading";
import { colors } from "@/constants/colors";
import { TicketModel } from "@/models/TicketModel";
import { ticketService } from "@/services/ticketService";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
  }, [ticketCode]);

  if (isLoading) {
    return <PageContentLoading />;
  }

  if (!ticket) {
    return null;
  }

  async function handleOnCancelTicket() {}

  return (
    <>
      <SafeAreaView style={s.pageContainer}>
        <Header />

        <ScrollView
          style={s.scrollContainer}
          contentContainerStyle={s.scrollContentContainer}
        >
          <View style={s.header}>
            
          </View>
        </ScrollView>

        {ticket.status === "RESERVADA" && (
          <View style={s.footerContainer}>
            <Button
              label="Cancelar passagem"
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
  header: {},
  footerContainer: {
    padding: 22,
    backgroundColor: colors.bg.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
});
