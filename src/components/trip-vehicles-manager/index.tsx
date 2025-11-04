import AddVehicleBottomSheetModal from "@/components/modals//add-vehicle-bottom-sheet-modal";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PlusIcon } from "phosphor-react-native";
import { useRef } from "react";
import { Text, View } from "react-native";
import Button from "../button";
import EmptyList from "../empty-list";
import { s } from "./styles";
import VehicleCardManager from "./vehicle-card-manager";

export default function TripVehiclesManager() {
  const { vehicles } = usePurchasePassager()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function handleOpenVehicleForm() {
    bottomSheetModalRef.current?.present();
  }

  let content;

  if (vehicles.length === 0) {
    content = (
      <EmptyList
        title="Sem veículos"
        description="Clique no botão acima ao lado do título e adicione um veículo caso tenha algum passageiro do tipo motorista"
        width={"100%"}
      />
    );
  } else {
    content = vehicles.map((vehicle) => <VehicleCardManager key={vehicle.plate} vehicle={vehicle} />);
  }

  return (
    <>
      <View style={s.container}>
        <View style={s.startContainer}>
          <Text style={s.startContainerTitle}>
            Veículos ({vehicles.length})
          </Text>

          <Button onPress={handleOpenVehicleForm} size="icon">
            <PlusIcon weight="bold" size={18} />
          </Button>
        </View>

        {content}
      </View>

      <AddVehicleBottomSheetModal ref={bottomSheetModalRef} />
    </>
  );
}