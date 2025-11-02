import ScheduleTripForm from "@/components/forms/schedule-trip-form";
import Header from "@/components/header";
import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScheduleTripScreen() {
  return (
    <SafeAreaView style={s.pageContainer}>
      <Header />

      <View style={s.pageContent}>
        <Text style={s.pageTitle}>Agende uma passagem</Text>
        <ScheduleTripForm />
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
    gap: 12,
  },
  pageTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: "800",
    paddingLeft: 22
  }
});
