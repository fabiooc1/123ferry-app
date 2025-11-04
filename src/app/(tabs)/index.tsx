import Header from "@/components/header";
import TodayTrips from "@/components/today-trips";
import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={s.pageContainer}>
      <Header />

      <View style={s.pageContent}>
        <Text style={s.pageTitle}>Passagens para hoje</Text>
        
        <TodayTrips title="São Luís -> Alcântara" routeId={1} />
        <TodayTrips title="Alcântara -> São Luís" routeId={2} />
      </View>
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
