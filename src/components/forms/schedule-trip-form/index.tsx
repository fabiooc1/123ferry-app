import Button from "@/components/button";
import TripsList from "@/components/trips-list";
import { TripsPaginationModel } from "@/models/TripsPaginationModel";
import { tripService } from "@/services/tripService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import FormField from "../form-field";
import SelectField from "../select-field";
import { ScheduleTripFormData, scheduleTripSchema } from "./schema";
import { s } from "./styles";

export default function ScheduleTripForm() {
  const [isSubmittingFormData, setIsSubittingFormData] = useState(false);
  const [tripsPaginationData, setTripsPaginationData] =
    useState<TripsPaginationModel | null>(null);

  const form = useForm({
    resolver: zodResolver(scheduleTripSchema),
    defaultValues: {
      departureDate: "",
      routeId: "",
    },
  });

  async function handleOnSearchTrips(data: ScheduleTripFormData) {
    try {
      setIsSubittingFormData(true);

      const result = await tripService.getAll(
        1,
        8,
        data.routeId,
        data.departureDate
      );
      setTripsPaginationData(result);
    } finally {
      setIsSubittingFormData(false);
    }
  }

  return (
    <View style={s.formContainer}>
      <View style={s.formFields}>
        <Controller
          control={form.control}
          name="routeId"
          render={({ field: { onChange, value } }) => (
            <SelectField
              label="Local de embarque*"
              options={[
                {
                  label: "São Luís",
                  value: "1",
                },
                {
                  label: "Conjupe",
                  value: "2",
                },
              ]}
              onValueChange={onChange}
              selectedValue={value}
              placeholder="Selecione o local"
              error={form.formState.errors.routeId?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="departureDate"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormField
              label="Data de partida*"
              placeholder="00/00/0000"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={form.formState.errors.departureDate?.message}
              type="date"
            />
          )}
        />
      </View>

      <TripsList
        isLoading={isSubmittingFormData && !!tripsPaginationData}
        tripsPaginationData={tripsPaginationData}
      />

      <Button
          onPress={form.handleSubmit(handleOnSearchTrips)}
          isSubmitting={isSubmittingFormData}
          label="Buscar"
        ></Button>
    </View>
  );
}
