import Header from "@/components/header";
import TodayTrips from "@/components/today-trips";
import { colors } from "@/constants/colors";
import { StatusBar, StyleSheet, Text, View } from "react-native";

const s = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: colors.bg.primary
  },
  pageContentContainer: {
    gap: 12,
  },
  pageTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: "800",
    paddingLeft: 22
  },
});

export default function HomeScreen() {
  return (
    <View style={s.pageContainer}>
      <Header />

      <View style={s.pageContentContainer}>
        <Text style={s.pageTitle}>Passagens para hoje</Text>
        
        <TodayTrips title="São Luís -> Conjupe" routeId={1} />
        <TodayTrips title="Conjupe -> São Luís" routeId={2} />
      </View>
    </View>
  );
}
