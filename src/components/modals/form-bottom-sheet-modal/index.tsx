import { colors } from "@/constants/colors";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, ReactNode, useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

type BottomSheetRef = BottomSheetModal;

interface FormBottomSheetModalProps {
  title: string;
  children: ReactNode;
  snapPoints?: (string | number)[];
  onDismiss?: () => void;
}

const FormBottomSheetModal = forwardRef<
  BottomSheetRef,
  FormBottomSheetModalProps
>(({ children, title, snapPoints: customSnapPoints, onDismiss }, ref) => {
  const snapPoints = useMemo(
    () => customSnapPoints || ["50%", "85%"],
    [customSnapPoints]
  );

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
      index={1}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      backgroundStyle={s.background}
      handleIndicatorStyle={s.handle}
    >
      <BottomSheetView style={s.contentContainer}>
        <View style={s.header}>
          <Text style={s.title}>{title}</Text>
        </View>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const s = StyleSheet.create({
  background: {
    backgroundColor: colors.bg.secondary,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  handle: {
    backgroundColor: colors.border.primary,
    width: 40,
  },
  contentContainer: {
    padding: 20,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    color: colors.text.primary,
    flex: 1,
    textAlign: "center",
  },
});

FormBottomSheetModal.displayName = "FormBottomSheetModal";

export default FormBottomSheetModal;
