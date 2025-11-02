import Button from "@/components/button";
import { CPF_MASK } from "@/constants/masks";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import FormField from "../form-field";
import SelectField from "../select-field";
import { AddPassagerFormData, addPassagerFormSchema } from "./schema";

interface AddPassagerFormProps {
  onSuccess: () =>  void
}

export default function AddPassagerForm({ onSuccess }: AddPassagerFormProps) {
  const { passagerTypes, passagers, addPassager } = usePurchasePassager()

  const selectOptions = passagerTypes.map(passager => ({
    label: passager.nome,
    value: String(passager.id)
  }))


  const form = useForm({
    resolver: zodResolver(addPassagerFormSchema),
    defaultValues: {
      passagerTypeId: 0,
      fullName: "",
      cpf: "",
      bornDate: "",
    },
  });

  async function handleOnAddPassager(data: AddPassagerFormData) {
    if (passagers.find(passager => passager.fullName === data.fullName)) {
      form.setError("fullName", { message: "Já possui um passageiro com esse nome" })
      return
    }

    if (passagers.find(passager => passager.cpf === data.fullName)) {
      form.setError("cpf", { message: "Já possui um passageiro com esse cpf" })
      return
    }

    addPassager(data)
    onSuccess()
  }

  return (
    <View style={s.form}>
      <Controller
        control={form.control}
        name="passagerTypeId"
        render={({ field: { onChange, value } }) => (
          <SelectField
            label="Tipo de passageiro*"
            options={selectOptions}
            onValueChange={onChange}
            selectedValue={value}
            placeholder="Selecione o tipo"
            error={form.formState.errors.passagerTypeId?.message}
          />
        )}
      />

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
        name="cpf"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormField
            label="CPF*"
            type="text"
            mask={CPF_MASK}
            placeholder="000.000.000-00"
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
      
      <Button onPress={form.handleSubmit(handleOnAddPassager)} label="Adicionar" />
    </View>
  );
}

const s = StyleSheet.create({
  form: {
    gap: 12
  },
});
