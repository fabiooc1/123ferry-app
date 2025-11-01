import Header from "@/components/header";
import TripHeader from "@/components/trip-header";
import TripPassagersManager from "@/components/trip-passagers-manager";
import { colors } from "@/constants/colors";
import { TripModel } from "@/models/TripModel";
import { tripService } from "@/services/tripService";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScheduleDetailsScreen() {
  const { tripId }: { tripId: string } = useLocalSearchParams();

  const [trip, setTrip] = useState<TripModel | null>(null);
  const [isLoadingPageContent, setIsLoadingPageContent] = useState(true);

  const navigate = useRouter();

  async function loadPageContent() {
    try {
      setIsLoadingPageContent(true);
      const [tripData] = await Promise.all([tripService.get(BigInt(tripId))]);

      setTrip(tripData);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }

      navigate.back();
    } finally {
      setIsLoadingPageContent(false);
    }
  }

  useEffect(() => {
    loadPageContent();
  }, []);

  return (
    <SafeAreaView style={s.pageContainer}>
      <Header />

      <View style={s.pageContent}>
        {trip && (
          <>
            <TripHeader title="Detalhes da passagem" trip={trip} />
            <TripPassagersManager />
          </>
        )}
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
