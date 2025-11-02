import { colors } from "@/constants/colors";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../header";
import { s } from "./styles";

export default function PageContentLoading() {
  return (
    <SafeAreaView style={s.pageContainer}>
      <Header />
      <View style={s.loadingContainer}>
        <ActivityIndicator size="large" color={colors.text.primary} />
      </View>
    </SafeAreaView>
  );
}
