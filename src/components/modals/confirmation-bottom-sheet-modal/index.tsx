import Button from "@/components/button";
import { colors } from "@/constants/colors";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { WarningCircleIcon } from "phosphor-react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { s } from "./styles";

type BottomSheetRef = BottomSheetModal;

interface ConfirmationBottomSheetModalProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

const ConfirmationBottomSheetModal = forwardRef<
  BottomSheetRef,
  ConfirmationBottomSheetModalProps
>((props, ref) => {
  const {
    title,
    description,
    onConfirm,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
  } = props;

  const snapPoints = useMemo(() => ["60%"], []);
  const { dismiss } = useBottomSheetModal();
  const { bottom: bottomSafeArea } = useSafeAreaInsets();

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

  const handleConfirm = () => {
    onConfirm();
    dismiss();
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      {...props}
      backdropComponent={renderBackdrop}
      backgroundStyle={s.background}
      handleIndicatorStyle={s.handle}
    >
      <BottomSheetView
        style={[
          s.contentContainer,
          {
            paddingBottom: bottomSafeArea > 0 ? bottomSafeArea : 20,
          },
        ]}
      >
        <WarningCircleIcon
          size={48}
          color={colors.status.danger}
          style={s.icon}
        />

        <Text style={s.title}>{title}</Text>

        <Text style={s.description}>{description}</Text>

        <View style={s.buttonContainer}>
          <Button
            variant="secondary"
            size="small"
            label={cancelText}
            onPress={() => dismiss()}
          />
          <Button
            variant="primary"
            size="small"
            label={confirmText}
            onPress={handleConfirm}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

ConfirmationBottomSheetModal.displayName = "ConfirmationBottomSheetModal";

export default ConfirmationBottomSheetModal;