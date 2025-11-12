import Header from "@/components/header";
import UserTicketsList from "@/components/user-tickets-list";
import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PurchasesScreen() {
  return (
    <SafeAreaView style={s.pageContainer} edges={['top', 'left', 'right']}>
      <Header />

      <View style={s.pageContent}>
        <Text style={s.pageTitle}>Suas passagens</Text>

        <UserTicketsList />
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
    paddingLeft: 22,
    paddingRight: 14,
    paddingBottom: 10
  },
  pageTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontFamily: 'Inter-ExtraBold',
  },
});
