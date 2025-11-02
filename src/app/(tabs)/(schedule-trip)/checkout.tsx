import Header from "@/components/header";
import PageContentLoading from "@/components/page-content-loading";
import TripHeader from "@/components/trip-header";
import TripSammaryCard from "@/components/trip-sammary-card";
import { colors } from "@/constants/colors";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckoutScreen() {
  const { currentTrip, passagerTypes, vehicleModels, passagers, vehicles, isLoading } = usePurchasePassager();
  const navigate = useRouter();

  if (isLoading) {
    return <PageContentLoading />;
  }

  if (!currentTrip) {
    navigate.back();
    return null
  }

  const cardSammaryData = {
    passagers: passagers.map((passager) => {
      const type = passagerTypes.find(
        (t) => t.id === passager.passagerTypeId
      );

      const names = passager.fullName.split(' ')
      
      return {
        firstName: names[0],
        secondName: names[1],
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

  return (
    <SafeAreaView style={s.pageContainer}>
      <Header />

      <View style={s.pageContent}>
        <TripHeader title="Confirmando Reserva" trip={currentTrip} />
        <TripSammaryCard data={cardSammaryData} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  pageContent: {
    flex: 1,
    paddingHorizontal: 22,
    paddingBottom: 10,
    gap: 26,
  },
});
