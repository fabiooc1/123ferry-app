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
import AddPassagerForm from "../forms/add-passager-form";
import { s } from "./styles";

type BottomSheetRef = BottomSheetModal;

const AddPassagerBottomSheetModal = forwardRef<
  BottomSheetRef
>((props, ref) => {
  const snapPoints = useMemo(() => ["70%"], []);
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
            <Text style={s.title}>Adicionar passageiro</Text>
            <Pressable onPress={() => dismiss()}>
              <XIcon color={colors.icon.primary} size={20} />
            </Pressable>
          </View>

          <AddPassagerForm onSuccess={dismiss} />
        </BottomSheetScrollView>
      </KeyboardAvoidingView>
    </BottomSheetModal>
  );
});

AddPassagerBottomSheetModal.displayName = "AddPassagerBottomSheetModal";

export default AddPassagerBottomSheetModal;