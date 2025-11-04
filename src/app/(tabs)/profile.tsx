import UpdateUsuarioForm from "@/components/forms/update-usuario-form";
import Header from "@/components/header";
import { colors } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { SignOutIcon } from "phosphor-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [isOutingUser, setIsOutingUser] = useState(false);
  const { logout } = useAuth();

  async function handleLogout() {
    setIsOutingUser(true);
    await logout();
    setIsOutingUser(false);
  }

  return (
    <SafeAreaView style={s.pageContainer}>
      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={s.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={s.startContainer}>
            <Text style={s.pageTitle}>Suas Informações</Text>

            <Pressable
              onPress={handleLogout}
              style={s.logoutButton}
              hitSlop={10}
            >
              {isOutingUser ? (
                <ActivityIndicator size="small" color={colors.status.danger} />
              ) : (
                <SignOutIcon size={26} color={colors.status.danger} />
              )}
            </Pressable>
          </View>
          <UpdateUsuarioForm />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  scrollContentContainer: {
    flexGrow: 1,
    gap: 12,
  },
  startContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  pageTitle: {
    color: colors.text.primary,
    fontSize: 24,
    fontFamily: "Inter-ExtraBold",
  },
  logoutButton: {
    paddingVertical: 4,
  },
  logoutButtonText: {
    color: colors.status.danger,
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
});
