import Button from "@/components/button";
import Header from "@/components/header";
import PageContentLoading from "@/components/page-content-loading";
import TicketRouter from "@/components/ticket-router";
import TripPassagersManager from "@/components/trip-passagers-manager";
import TripVehiclesManager from "@/components/trip-vehicles-manager";
import { colors } from "@/constants/colors";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScheduleDetailsScreen() {
  const { tripParamId }: { tripParamId: string } = useLocalSearchParams();
  const tripId = Number(tripParamId);
  const navigate = useRouter();

  const { loadDataForTrip, currentTrip, passagers, vehicles, isLoading } =
    usePurchasePassager();

  useEffect(() => {
    loadPageContent();
  }, [tripParamId]);

  async function loadPageContent() {
    if (!tripParamId) return;

    try {
      loadDataForTrip(tripId);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro ao carregar", error.message);
      }

      navigate.back();
    }
  }

  if (isLoading) {
    return <PageContentLoading />;
  }

  if (!currentTrip) {
    return null;
  }

  const isValidPushUserToCheckoutPage = () => {
    const totalPassagersInCart = passagers.length;
    const driverCount = passagers.filter(
      (passager) => passager.passagerTypeId === 1
    ).length;
    const vehicleCount = vehicles.length;

    const isCartNotEmpty = totalPassagersInCart > 0;
    const isDriverVehicleRatioCorrect = driverCount === vehicleCount;

    return isCartNotEmpty && isDriverVehicleRatioCorrect;
  };

  function handleNavigateToCheckout() {
    navigate.push("/(tabs)/(schedule-trip)/checkout");
  }

  return (
    <SafeAreaView style={s.pageContainer}>
      <Header />

      <ScrollView
        style={s.scrollContainer}
        contentContainerStyle={s.scrollContentContainer}
      >
        {currentTrip && (
          <>
            <View style={{ gap: 12 }}>
              <Text style={s.pageTitle}>Detalhes da passagem</Text>

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
            <TripPassagersManager />
            <TripVehiclesManager />
          </>
        )}
      </ScrollView>

      <View style={s.footerContainer}>
        <Button
          label="Prosseguir"
          onPress={handleNavigateToCheckout}
          disabled={!isValidPushUserToCheckoutPage()}
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
