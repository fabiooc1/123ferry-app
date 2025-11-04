import { TicketPassagerModel } from "@/models/TicketPassagerModel";
import { TicketVehicleModel } from "@/models/TicketVehicleModel";
import { StyleSheet, Text, View } from "react-native";
import Sammary from "./sammary";

interface TicketSammaryProps {
    passagers: TicketPassagerModel[]
    vehicles: TicketVehicleModel[]
}

export default function TicketSammary({ passagers, vehicles }: TicketSammaryProps) {
    const sammaryData = {
        passagers: passagers.map((passager) => {
          const splitedName = passager.nomeCompleto.split(" ");
          const firstName = splitedName[0];
          const secondName = splitedName[1];
    
          return {
            firstName,
            secondName,
            typeName: passager.tipo.nome,
            priceInCents: passager.precoPagoEmCentavos!,
          };
        }),
        vehicles: vehicles.map((vehicle) => ({
          modelName: vehicle.veiculoCategoria.nome,
          plate: vehicle.placa,
          priceInCents: vehicle.precoPagoEmCentavos!,
        })),
      };

    return (
        <View style={s.container}>
            <Text style={s.sectionTitle}>Detalhes do pagamento</Text>

            <Sammary data={sammaryData}  />
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        gap: 12,
        paddingHorizontal: 22,
        paddingTop: 20,
        paddingBottom: 10
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    }
})