import Button from "@/components/button";
import Header from "@/components/header";
import PageContentLoading from "@/components/page-content-loading";
import Sammary from "@/components/sammary";
import TicketRouter from "@/components/ticket-router";
import { colors } from "@/constants/colors";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { ticketService } from "@/services/ticketService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckoutScreen() {
  const {
    currentTrip,
    passagerTypes,
    vehiclesCategories,
    passagers,
    vehicles,
    isLoading,
    purchaseDone,
  } = usePurchasePassager();
  const navigate = useRouter();
  const [isBooking, setIsBooking] = useState(false);

  if (isLoading) {
    return <PageContentLoading />;
  }

  if (!currentTrip) {
    return null;
  }

  const cardSammaryData = {
    passagers: passagers.map((passager) => {
      const type = passagerTypes.find((t) => t.id === passager.passagerTypeId);

      const names = passager.fullName.split(" ");

      return {
        firstName: names[0],
        secondName: names.length > 1 ? names[1] : "",
        typeName: type?.nome || "Tipo não encontrado",
        priceInCents: type?.precoEmCentavos || 0,
      };
    }),
    vehicles: vehicles.map((vehicle) => {
      const model = vehiclesCategories.find(
        (m) => Number(m.id) === vehicle.vehicleCategoryId
      );

      return {
        modelName: model?.nome || "Modelo não encontrado",
        plate: vehicle.plate,
        priceInCents: model?.precoPassagemEmCentavos || 0,
      };
    }),
  };

  const handleConfirmBooking = async () => {
    setIsBooking(true);
    try {
      const ticket = await ticketService.create({
        viagemId: currentTrip.id,
        passageiros: passagers.map((passager) => ({
          nomeCompleto: passager.fullName,
          tipoId: passager.passagerTypeId,
          cpf: passager.cpf,
          dataNascimento: passager.bornDate,
        })),
        veiculos: vehicles.map((vehicle) => ({
          veiculoCategoriaId: vehicle.vehicleCategoryId,
          motoristaCpf: vehicle.driverCpf,
          placa: vehicle.plate,
        })),
      });

      navigate.replace({
        pathname: "/(tabs)/purchase-details",
        params: {
          ticketCode: ticket.codigo,
        },
      });

      purchaseDone();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error: ", error.message);
      }
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <SafeAreaView style={s.pageContainer}>
      <Header />

      <ScrollView
        style={s.scrollContainer}
        contentContainerStyle={s.scrollContentContainer}
      >
        <View style={{ gap: 12 }}>
          <Text style={s.pageTitle}>Confirmando passagem</Text>

          <TicketRouter
            presentation="trip"
            arrival={{
              city: currentTrip.rota.destino.cidade,
              dataChegada: currentTrip.dataChegada,
            }}
            departure={{
              city: currentTrip.rota.origem.cidade,
              dataPartida: currentTrip.dataPartida,
            }}
          />
        </View>
        <Sammary data={cardSammaryData} isCard={true} />
      </ScrollView>

      <View style={s.footerContainer}>
        <Button
          label="Confirmar Reserva"
          onPress={handleConfirmBooking}
          disabled={isBooking}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  pageTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontFamily: "Inter-ExtraBold",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 22,
    paddingBottom: 20,
    gap: 26,
  },
  footerContainer: {
    padding: 22,
    backgroundColor: colors.bg.primary,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
  },
});
