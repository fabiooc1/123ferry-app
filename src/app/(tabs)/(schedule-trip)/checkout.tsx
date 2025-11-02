import Button from "@/components/button";
import Header from "@/components/header";
import PageContentLoading from "@/components/page-content-loading";
import TripHeader from "@/components/trip-header";
import TripSammaryCard from "@/components/trip-sammary-card";
import { colors } from "@/constants/colors";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { ticketService } from "@/services/ticketService";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckoutScreen() {
  const {
    currentTrip,
    passagerTypes,
    vehicleModels,
    passagers,
    vehicles,
    isLoading,
    purchaseDone
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
      const type = passagerTypes.find(
        (t) => t.id === passager.passagerTypeId
      );

      const names = passager.fullName.split(" ");

      return {
        firstName: names[0],
        secondName: names.length > 1 ? names[1] : "",
        typeName: type?.nome || "Tipo não encontrado",
        priceInCents: type?.precoEmCentavos || 0,
      };
    }),
    vehicles: vehicles.map((vehicle) => {
      const model = vehicleModels.find(
        (m) => Number(m.id) === vehicle.vehicleModelId
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
          dataNascimento: passager.bornDate
        })),
        veiculos: vehicles.map((vehicle) => ({
          veiculoId: vehicle.vehicleModelId,
          motoristaCpf: vehicle.driverCpf,
          placa: vehicle.plate
        }))
      })

      navigate.replace({
        pathname: "/(tabs)/(purchases)/purchase-details",
        params: {
          ticketId: ticket.id
        }
      })

      purchaseDone()
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error: ", error.message)
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
        <TripHeader title="Confirmando Reserva" trip={currentTrip} />
        <TripSammaryCard data={cardSammaryData} />
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