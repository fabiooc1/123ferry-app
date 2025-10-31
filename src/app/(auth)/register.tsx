import RegisterForm from "@/components/forms/register-form";
import { colors } from "@/constants/colors";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={s.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={s.scrollView}
          contentContainerStyle={s.pageContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={s.pageTitle}>Registro</Text>

          <RegisterForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  scrollView: {
    flex: 1,
  },
  pageContainer: {
    paddingHorizontal: 26,
    paddingVertical: 10,
    gap: 20,
    backgroundColor: colors.bg.primary,
  },
  startContainer: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontFamily: "Inter-ExtraBold",
  },
});
