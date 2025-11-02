import Button from "@/components/button";
import Header from "@/components/header";
import PageContentLoading from "@/components/page-content-loading";
import TripHeader from "@/components/trip-header";
import TripPassagersManager from "@/components/trip-passagers-manager";
import TripVehiclesManager from "@/components/trip-vehicles-manager";
import { colors } from "@/constants/colors";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScheduleDetailsScreen() {
  const { tripId }: { tripId: string } = useLocalSearchParams();
  const navigate = useRouter();

  const { loadDataForTrip, currentTrip, passagers, vehicles, isLoading } =
    usePurchasePassager();

  async function loadPageContent() {
    if (!tripId) return;

    try {
      loadDataForTrip(tripId);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro ao carregar", error.message);
      }

      navigate.back();
    }
  }

  useEffect(() => {
    loadPageContent();
  }, [tripId]);

  if (isLoading) {
    return <PageContentLoading />;
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
            <TripHeader title="Detalhes da passagem" trip={currentTrip} />
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
