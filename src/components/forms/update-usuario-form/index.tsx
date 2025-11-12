import Button from "@/components/button";
import { PHONE_MASK } from "@/constants/masks";
import { useAuth } from "@/contexts/AuthContext";
import { ValidationError } from "@/services/errors/ValidationError";
import { userService } from "@/services/userService";
import { formatDate } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import FormField from "../form-field";
import { UpdateUsuarioFormData, updateUsuarioFormSchema } from "./schema";
import { s } from "./styles";

export default function UpdateUsuarioForm() {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const { user, setUser } = useAuth();
  const navigator = useRouter();

  const form = useForm({
    resolver: zodResolver(updateUsuarioFormSchema),
    defaultValues: {
      fullName: user?.nomeCompleto,
      phone: user?.telefone,
      password: undefined,
    },
    mode: "onChange",
  });

  async function handleOnUpdateUserSubmit(data: UpdateUsuarioFormData) {
    try {
      setIsSubmittingForm(true);
      const user = await userService.update({
        nomeCompleto: data.fullName,
        telefone: data.phone,
        senha: data.password,
      });

      setUser(user);
      form.reset();
    } catch (error) {
      if (error instanceof ValidationError) {
        form.setError(error.field as any, {
          message: error.message,
        });

        return;
      }
    } finally {
      setIsSubmittingForm(false);
    }
  }

  if (!user) {
    navigator.replace("/(auth)/login");
    return;
  }

  return (
    <View style={s.formContainer}>
      <View style={s.formFields}>
        <Controller
          control={form.control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Nome completo"
              type="text"
              placeholder="Fulano de tal da Silva"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.fullName?.message}
            />
          )}
        />

        <FormField
          label="E-mail"
          type="text"
          placeholder="seuemail@example.com"
          value={user?.email}
          disabled={true}
        />

        <Controller
          control={form.control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Telefone"
              type="number"
              mask={PHONE_MASK}
              placeholder="(00) 90000-0000"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.phone?.message}
            />
          )}
        />

        <FormField
          label="CPF"
          type="number"
          placeholder="000.000.000-00"
          value={user?.cpf}
          disabled={true}
        />

        <FormField
          label="Data de nascimento"
          placeholder="00/00/0000"
          value={formatDate(user?.dataNascimento)}
          type="date"
          disabled={true}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Senha"
              type="password"
              placeholder="Digite uma nova senha"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.password?.message}
            />
          )}
        />
      </View>

      <View style={s.footerContainer}>
        <Button
          label="Salvar alterações"
          onPress={form.handleSubmit(handleOnUpdateUserSubmit)}
          disabled={!form.formState.isDirty || !form.formState.isValid}
          isSubmitting={isSubmittingForm}
        />
      </View>
    </View>
  );
}
