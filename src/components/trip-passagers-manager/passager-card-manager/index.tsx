import ConfirmationBottomSheetModal from "@/components/confirmation-bottom-sheet-modal";
import { colors } from "@/constants/colors";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { SavePassagerInTripModel } from "@/models/SavePassagerInTripModel";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PencilSimpleIcon, TrashIcon } from "phosphor-react-native";
import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import { s } from "./styles";

interface PassagerCardManagerProps {
  passager: SavePassagerInTripModel;
}

export default function PassagerCardManager({
  passager,
}: PassagerCardManagerProps) {
  const confirmationModalRef = useRef<BottomSheetModal>(null);
  const { removePassager } = usePurchasePassager()

  function handleConfirmDelete(passagerCpf: string) {
    removePassager(passagerCpf)
  }

  return (
    <>
      <View style={s.container}>
        <Text style={s.fullName}>{passager.fullName}</Text>

        <View style={s.actionsContainer}>
          <Pressable 
            style={s.actionButton}
            accessibilityRole="button"
            accessibilityLabel={`Editar passageiro ${passager.fullName}`}
          >
            <PencilSimpleIcon color={colors.icon.primary} size={16} />
          </Pressable>

          <Pressable 
            style={s.actionButton} 
            onPress={() => confirmationModalRef.current?.present()}
            accessibilityRole="button"
            accessibilityLabel={`Excluir passageiro ${passager.fullName}`}
          >
            <TrashIcon color={colors.status.error} size={16} />
          </Pressable>
        </View>
      </View>

      <ConfirmationBottomSheetModal
        ref={confirmationModalRef}
        title="Remover Passageiro?"
        description="Esta ação não pode ser desfeita. Você terá que adicionar os dados do passageiro novamente."
        confirmText="Sim, excluir"
        onConfirm={() => handleConfirmDelete(passager.cpf)}
      />
    </>
  );
}