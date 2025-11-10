import Button from "@/components/button";
import FormField from "@/components/forms/form-field";
import { colors } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { ValidationError } from "@/services/errors/ValidationError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";
import { LoginFormData, loginFormSchema } from "./schema";

export default function LoginForm() {
  const [isSubmittingFormData, setIsSubmittingFormData] = useState(false)
  const { login } = useAuth()
  const navigate = useRouter()

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleOnSubmitLogin(data: LoginFormData) {
    try {
      setIsSubmittingFormData(true)
      await login(data)

      navigate.replace("/(tabs)")
    } catch (error) {
      if (error instanceof ValidationError) {
        form.setError("email", {
          message: error.message,
        });
        
        form.setError("password", {
          message: error.message,
        });

        return
      }

      Alert.alert("Ocorreu um erro inesperado. Contate um suporte.")
    } finally {
      setIsSubmittingFormData(false)
    }
  }

  return (
    <View>
      <View style={s.formContainer}>
        <Controller
          control={form.control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="E-mail*"
              type="email"
              placeholder="Seu e-mail"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.email?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Senha*"
              type="password"
              placeholder="Sua senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.password?.message}
            />
          )}
        />

        <View style={s.formFooter}>
          <Button
            onPress={form.handleSubmit(handleOnSubmitLogin)}
            label="Entrar"
            isSubmitting={isSubmittingFormData}
          />
          <Link style={s.formFooterLink} href="/(auth)/register">
            Ainda não possui uma conta? Registre-se
          </Link>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  formContainer: {
    gap: 20,
  },
  formFooter: {
    gap: 24,
  },
  formFooterLink: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: colors.text.tertiary,
    textAlign: "center",
  },
});
