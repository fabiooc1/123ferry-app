import AddVehicleForm from "@/components/forms/add-vehicle-form";
import { colors } from "@/constants/colors";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { XIcon } from "phosphor-react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View
} from "react-native";
import { s } from "./styles";

type BottomSheetRef = BottomSheetModal;

const AddVehicleBottomSheetModal = forwardRef<
  BottomSheetRef
>((props, ref) => {
  const snapPoints = useMemo(() => ["60%"], []);
  const { dismiss } = useBottomSheetModal();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      {...props}
      backdropComponent={renderBackdrop}
      backgroundStyle={s.background}
      handleIndicatorStyle={s.handle}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <BottomSheetScrollView contentContainerStyle={s.contentContainer}>
          <View style={s.header}>
            <View style={{ width: 20 }} />
            <Text style={s.title}>Adicionar veículo</Text>
            <Pressable onPress={() => dismiss()}>
              <XIcon color={colors.icon.primary} size={20} />
            </Pressable>
          </View>

          <AddVehicleForm onSuccess={dismiss} />
        </BottomSheetScrollView>
      </KeyboardAvoidingView>
    </BottomSheetModal>
  );
});

AddVehicleBottomSheetModal.displayName = "AddVehicleBottomSheetModal";

export default AddVehicleBottomSheetModal;