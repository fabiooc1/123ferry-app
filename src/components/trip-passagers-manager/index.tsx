import { colors } from "@/constants/colors";
import { SavePassagerInTripModel } from "@/models/SavePassagerInTripModel";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { PlusIcon } from "phosphor-react-native";
import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddPassagerBottomSheetModal from "../add-passager-bottom-sheet-modal";
import Button from "../button";
import EmptyList from "../empty-list";

export default function TripPassagersManager() {
  const [passagers, setPassagers] = useState<SavePassagerInTripModel[]>([]);
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
    content = passagers.map((passager) => null);
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

const s = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 18,
    backgroundColor: colors.bg.secondary,
    borderWidth: 2,
    borderColor: colors.border.primary,
    gap: 10,
  },
  startContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  startContainerTitle: {
    color: colors.text.secondary,
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
});