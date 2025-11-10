import Header from "@/components/header";
import TodayTrips from "@/components/today-trips";
import { useTodayTrips } from "@/components/today-trips/hooks/use-today-trips";
import { colors } from "@/constants/colors";
import { useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: isLoadingRoute1, tripsPaginationData: tripsPaginationDataRoute1, loadTrips: refetchRoute1 } = useTodayTrips(1)
  const { isLoading: isLoadingRoute2, tripsPaginationData: tripsPaginationDataRoute2, loadTrips: refetchRoute2 } = useTodayTrips(2)

  const onRefresh = async () => {
    try {
      setRefreshing(true)
      await Promise.all([
        refetchRoute1,
        refetchRoute2,
      ])
    } finally {
      setRefreshing(false)
    }
  }

  return (
    <SafeAreaView style={s.pageContainer}>
      <Header />

      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={s.pageContent}>
          <Text style={s.pageTitle}>Passagens para hoje</Text>

          <TodayTrips routeName="São Luís -> Alcântara" isLoading={isLoadingRoute1} trips={tripsPaginationDataRoute1?.data || []} />
          <TodayTrips routeName="Alcântara -> São Luís" isLoading={isLoadingRoute2} trips={tripsPaginationDataRoute2?.data || []} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.bg.primary
  },
  pageContent: {
    flex: 1,
    gap: 12,
  },
  pageTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontFamily: 'Inter-ExtraBold',
    paddingLeft: 22
  },
});
