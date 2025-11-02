import { colors } from "@/constants/colors";
import { formatCurrency } from "@/utils/money";
import { Text, View } from "react-native";
import { s } from "./styles";

interface TripSammaryCardProps {
  data: {
    passagers: {
      firstName: string;
      secondName: string;
      typeName: string;
      priceInCents: number;
    }[];
    vehicles: {
      modelName: string;
      plate: string;
      priceInCents: number;
    }[];
  };
}

export default function TripSammaryCard({ data }: TripSammaryCardProps) {
  const totalPassagersPrice = data.passagers.reduce(
    (sum, passager) => sum + passager.priceInCents, 0
  );

  const totalVehiclesPrice = data.vehicles.reduce(
    (sum, vehicle) => sum + vehicle.priceInCents, 0
  );

  const totalPrice = totalPassagersPrice + totalVehiclesPrice;

  return (
    <View style={s.container}>
      <View style={s.secondaryContainer}>
        <Text style={s.secondaryTitle}>Passageiros</Text>
        <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}
        />

        {data.passagers.map((passager) => (
          <View key={passager.typeName} style={s.itemContainer}>
            <Text style={s.type}>
              {passager.firstName} {passager.secondName} ({passager.typeName})
            </Text>

            <Text style={s.typePrice}>
              {formatCurrency(passager.priceInCents)}
            </Text>
          </View>
        ))}
      </View>

      {data.vehicles.length > 0 && (
        <View style={s.secondaryContainer}>
          <Text style={s.secondaryTitle}>Veículos</Text>
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderColor: colors.border.primary,
            }}
          />

          {data.vehicles.map((vehicle) => (
            <View key={vehicle.plate} style={s.itemContainer}>
              <Text style={s.type}>
                {vehicle.modelName} ({vehicle.plate})
              </Text>
              <Text style={s.typePrice}>
                {formatCurrency(vehicle.priceInCents)}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={s.footerContainer}>
        <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderColor: colors.border.primary,
          }}
        />

        <View style={s.footerTexts}>
          <Text style={s.total}>Total:</Text>
          <Text style={s.totalPrice}>{formatCurrency(totalPrice)}</Text>
        </View>
      </View>
    </View>
  );
}

