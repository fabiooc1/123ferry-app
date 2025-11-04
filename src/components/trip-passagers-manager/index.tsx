import AddPassagerBottomSheetModal from "@/components/modals/add-passager-bottom-sheet-modal";
import { usePurchasePassager } from "@/contexts/PurshasePassagerContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PlusIcon } from "phosphor-react-native";
import { useRef } from "react";
import { Text, View } from "react-native";
import Button from "../button";
import EmptyList from "../empty-list";
import PassagerCardManager from "./passager-card-manager";
import { s } from "./styles";

export default function TripPassagersManager() {
  const { passagers } = usePurchasePassager()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  function handleOpenPassagerForm() {
    bottomSheetModalRef.current?.present();
  }

  let content;

  if (passagers.length === 0) {
    content = (
      <EmptyList
        title="Sem passageiros"
        description="Clique no botão acima ao lado do título e adicione um passageiro"
        width={"100%"}
      />
    );
  } else {
    content = passagers.map((passager) => <PassagerCardManager key={passager.cpf} passager={passager} />);
  }

  return (
    <>
      <View style={s.container}>
        <View style={s.startContainer}>
          <Text style={s.startContainerTitle}>
            Passageiros ({passagers.length})
          </Text>

          <Button onPress={handleOpenPassagerForm} size="icon">
            <PlusIcon weight="bold" size={18} />
          </Button>
        </View>

        {content}
      </View>

      <AddPassagerBottomSheetModal ref={bottomSheetModalRef} />
    </>
  );
}