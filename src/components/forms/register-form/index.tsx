import Button from "@/components/button";
import { colors } from "@/constants/colors";
import { ValidationError } from "@/services/errors/ValidationError";
import { userService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";
import FormField from "../form-field";
import { RegisterFormData, registerFormSchema } from "./schema";

const CPF_MASK = "999.999.999-99";
const PHONE_MASK = "(99) 99999-9999";

export default function RegisterForm() {
  const [isSubmittingFormData, setIsSubmittingFormData] = useState(false)

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      cpf: "",
      bornDate: "",
      password: "",
      confirmationPassword: "",
    },
  });

  const navigate = useRouter()

  
  async function handleOnSubmitRegister(data: RegisterFormData) {
    try {
      setIsSubmittingFormData(true);
      await userService.create({
        nomeCompleto: data.fullName,
        email: data.email,
        cpf: data.cpf,
        dataNascimento: data.bornDate,
        telefone: data.phone,
        senha: data.password
      });

      await userService.login({
        email: data.email,
        password: data.password
      })

      navigate.replace("/(tabs)");
    } catch (error) {
      if (error instanceof ValidationError) {
        form.setError(error.field, {
          message: error.message
        })

        return
      }

      if (error instanceof Error) {
        Alert.alert(
          error.message,
          "Não foi possível realizar o login por algum erro interno. Contate um administrador"
        );
      }
    } finally {
      setIsSubmittingFormData(false);
    }
  }

  return (
    <View>
      <View style={s.formContainer}>
        <Controller
          control={form.control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Nome completo*"
              type="text"
              placeholder="Fulano de tal da Silva"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.fullName?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="E-mail*"
              type="text"
              placeholder="seuemail@example.com"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.email?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Telefone*"
              type="text"
              placeholder="(00) 90000-0000"
              mask={PHONE_MASK}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.phone?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="cpf"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="CPF*"
              type="text"
              placeholder="000.000.000-00"
              mask={CPF_MASK}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.cpf?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="bornDate"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Data de nascimento*"
              placeholder="00/00/0000"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.bornDate?.message}
              type="date"
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

        <Controller
          control={form.control}
          name="confirmationPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Confirmar senha*"
              type="password"
              placeholder="Digite a senha novamente"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.confirmationPassword?.message}
            />
          )}
        />

        <View style={s.formFooter}>
          <Button
            onPress={form.handleSubmit(handleOnSubmitRegister)}
            isSubmitting={isSubmittingFormData}
            label="Registrar-se"
          />
          <Link style={s.formFooterLink} href="/(auth)/login">
            Já possui uma conta? Faça login!
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
