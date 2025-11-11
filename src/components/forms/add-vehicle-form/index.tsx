import Button from "@/components/button";
import { PLATE_MASK } from "@/constants/masks";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import FormField from "../form-field";
import SelectField from "../select-field";
import { AddVehicleFormData, addVehicleFormSchema } from "./schema";

interface AddVehicleFormProps {
  onSuccess: () => void;
}

export default function AddVehicleForm({ onSuccess }: AddVehicleFormProps) {
  const { vehiclesCategories, addVehicle, vehicles, passagers } = usePurchasePassager();

  const form = useForm({
    resolver: zodResolver(addVehicleFormSchema),
    defaultValues: {
      vehicleCategoryId: 0,
      plate: "",
      driverCpf: "",
    },
  });

  async function handleOnAddVehicle(data: AddVehicleFormData) {
    if (vehicles.find(vehicle => vehicle.plate === data.plate)) {
        form.setError('plate', { message: "Já possui uma veículo com essa placa" })
        return
    }

    addVehicle(data)
    onSuccess()
  }

  const vehiclesCategoriesSelectOptions = vehiclesCategories.map((vehicleModel) => ({
    label: vehicleModel.nome,
    value: String(vehicleModel.id),
  }));

  const driversSelectOptions = passagers
    .filter((passager) => {
      const isDriver = passager.passagerTypeId === 1;
      const vehicleFound = vehicles.find(
        (vehicle) => vehicle.driverCpf === passager.cpf
      );

      return isDriver && !vehicleFound;
    })
    .map((passager) => ({
      label: passager.fullName,
      value: passager.cpf,
    }));

  return (
    <View style={s.form}>
      <Controller
        control={form.control}
        name="vehicleCategoryId"
        render={({ field: { onChange, value } }) => (
          <SelectField
            label="Selecione o modelo*"
            options={vehiclesCategoriesSelectOptions}
            onValueChange={onChange}
            selectedValue={value}
            placeholder="Modelo do veículo"
            error={form.formState.errors.vehicleCategoryId?.message}
          />
        )}
      />

      <Controller
        control={form.control}
        name="plate"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormField
            label="Placa*"
            type="plate"
            useBottomSheet={true}
            mask={PLATE_MASK}
            placeholder="Placa do carro"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={form.formState.errors.plate?.message}
          />
        )}
      />

      <Controller
        control={form.control}
        name="driverCpf"
        render={({ field: { onChange, value } }) => (
          <SelectField
            label="Selecione o motorista*"
            options={driversSelectOptions}
            onValueChange={onChange}
            selectedValue={value}
            placeholder="Motorista do veículo"
            error={form.formState.errors.driverCpf?.message}
          />
        )}
      />

      <Button
        onPress={form.handleSubmit(handleOnAddVehicle)}
        label="Adicionar"
      />
    </View>
  );
}

const s = StyleSheet.create({
  form: {
    gap: 12,
  },
});
