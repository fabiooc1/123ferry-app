import ConfirmationBottomSheetModal from "@/components/modals/confirmation-bottom-sheet-modal";
import { colors } from "@/constants/colors";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { SaveVehicleInTripModel } from "@/models/SaveVehicleInTripModel";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PencilSimpleIcon, TrashIcon } from "phosphor-react-native";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { s } from "./styles";

interface VehicleCardManagerProps {
  vehicle: SaveVehicleInTripModel;
}

export default function VehicleCardManager({
  vehicle,
}: VehicleCardManagerProps) {
  const confirmationModalRef = useRef<BottomSheetModal>(null);
  const { removeVehicle, vehiclesCategories } = usePurchasePassager();

  const vehicleCategoriesInfos = vehiclesCategories.find(vehicleCategory => Number(vehicleCategory.id) === vehicle.vehicleCategoryId)

  function handleConfirmDelete(plate: string) {
    removeVehicle(plate);
  }

  return (
    <>
      <View style={s.container}>
        <View style={s.startContainer}>
          {vehicleCategoriesInfos && (<Text style={s.vehicleModel}>{vehicleCategoriesInfos.nome}</Text>)}
          <Text style={s.vehiclePlate}>{vehicle.plate}</Text>
        </View>

        <View style={s.actionsContainer}>
          <Pressable
            style={s.actionButton}
            accessibilityRole="button"
            accessibilityLabel={`Editar veículo ${vehicle.plate}`}
          >
            <PencilSimpleIcon color={colors.icon.primary} size={16} />
          </Pressable>

          <Pressable
            style={s.actionButton}
            onPress={() => confirmationModalRef.current?.present()}
            accessibilityRole="button"
            accessibilityLabel={`Excluir veículo ${vehicle.plate}`}
          >
            <TrashIcon color={colors.status.danger} size={16} />
          </Pressable>
        </View>
      </View>

      <ConfirmationBottomSheetModal
        ref={confirmationModalRef}
        title="Remover Veículo?"
        description="Esta ação não pode ser desfeita. Você terá que adicionar os dados do veículo novamente."
        confirmText="Sim, excluir"
        onConfirm={() => handleConfirmDelete(vehicle.plate)}
      />
    </>
  );
}
