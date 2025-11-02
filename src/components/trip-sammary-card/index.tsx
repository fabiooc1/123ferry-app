import { colors } from "@/constants/colors";
import { formatCurrency } from "@/utils/money";
import { StyleSheet, Text, View } from "react-native";

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

const s = StyleSheet.create({
  container: {
    borderRadius: 18,
    backgroundColor: colors.bg.secondary,
    borderWidth: 2,
    borderColor: colors.border.primary,
    padding: 12,
    gap: 6,
  },
  secondaryContainer: {
    gap: 8,
  },
  secondaryTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    color: colors.text.secondary,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  type: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.text.tertiary,
  },
  typePrice: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.status.avaliable,
  },

  footerContainer: {
    gap: 8,
  },
  footerTexts: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  total: {
    fontSize: 20,
    fontFamily: "Inter-ExtraBold",
    color: colors.text.secondary,
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: "Inter-ExtraBold",
    color: colors.status.avaliable,
  },
});
