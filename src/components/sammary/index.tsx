import { formatCurrency } from "@/utils/money";
import { Text, View } from "react-native";
import Line from "../Line";
import { s } from "./styles";

export type PassagerSammary = {
  firstName: string;
  secondName: string;
  typeName: string;
  priceInCents: number;
};

export type VehicleSammary = {
  modelName: string;
  plate: string;
  priceInCents: number;
};

interface SammaryProps {
  isCard?: boolean;
  data: {
    passagers: PassagerSammary[];
    vehicles: VehicleSammary[];
  };
}

export default function Sammary({ data, isCard = false }: SammaryProps) {
  const totalPassagersPrice = data.passagers.reduce(
    (sum, passager) => sum + passager.priceInCents,
    0,
  );

  const totalVehiclesPrice = data.vehicles.reduce(
    (sum, vehicle) => sum + vehicle.priceInCents,
    0,
  );

  const totalPrice = totalPassagersPrice + totalVehiclesPrice;

  return (
    <View style={isCard ? s.cardContainer : s.container}>
      <View style={s.secondaryContainer}>
        <Text style={s.secondaryTitle}>Passageiros</Text>
        <Line />

        {/* MUDANÇA: Usando 'index' como key, pois 'typeName' não é único.
          MUDANÇA: Estrutura de texto atualizada para hierarquia.
        */}
        {data.passagers.map((passager, index) => (
          <View key={index} style={s.itemContainer}>
            <View style={s.itemDetails}>
              <Text style={s.itemPrimaryText}>
                {passager.firstName} {passager.secondName}
              </Text>
              <Text style={s.itemSecondaryText}>({passager.typeName})</Text>
            </View>

            <Text style={s.itemPrice}>
              {formatCurrency(passager.priceInCents)}
            </Text>
          </View>
        ))}
      </View>

      {data.vehicles.length > 0 && (
        <View style={s.secondaryContainer}>
          <Text style={s.secondaryTitle}>Veículos</Text>
          <Line />
          {data.vehicles.map((vehicle) => (
            <View key={vehicle.plate} style={s.itemContainer}>
              <View style={s.itemDetails}>
                <Text style={s.itemPrimaryText}>{vehicle.modelName}</Text>
                <Text style={s.itemSecondaryText}>({vehicle.plate})</Text>
              </View>
              <Text style={s.itemPrice}>
                {formatCurrency(vehicle.priceInCents)}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={s.footerContainer}>
        <Line />

        <View style={s.footerTexts}>
          <Text style={s.total}>Total:</Text>
          <Text style={s.totalPrice}>{formatCurrency(totalPrice)}</Text>
        </View>
      </View>
    </View>
  );
}