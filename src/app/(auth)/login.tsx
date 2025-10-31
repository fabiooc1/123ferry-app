import LoginForm from "@/components/forms/login-form";
import { colors } from "@/constants/colors";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
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
          <View style={s.startContainer}>
            <Image
              source={require("@/assets/images/icon.png")}
              accessibilityLabel="Logo 123 Ferry"
              style={s.logo}
            />
            <Text style={s.pageTitle}>Faça login</Text>
          </View>

          <LoginForm />
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
    backgroundColor: colors.bg.primary,
    justifyContent: "center",
    paddingHorizontal: 26,
    paddingVertical: 10,
    gap: 20,
    flexGrow: 1,
  },
  startContainer: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    color: colors.text.primary,
    fontSize: 32,
    fontFamily: "Inter-ExtraBold",
  },
  logo: {
    width: 87,
    height: 87,
  },
});
