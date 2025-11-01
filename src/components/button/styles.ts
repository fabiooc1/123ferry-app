import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

const BASE_CONTAINER_STYLE = {
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: colors.border.primary,
  width: '100%',
} as const;

const BASE_TEXT_STYLE = {
  textAlign: 'center',
  fontSize: 16,
  fontFamily: 'Inter-Bold',
} as const;

export const s = StyleSheet.create({
  primaryContainer: {
    ...BASE_CONTAINER_STYLE,
    backgroundColor: colors.bg.onAccent,
  },
  primaryText: {
    ...BASE_TEXT_STYLE,
    color: colors.text.onAccent,
  },

  secondaryContainer: {
    ...BASE_CONTAINER_STYLE,
    backgroundColor: colors.bg.secondary,
  },
  secondaryText: {
    ...BASE_TEXT_STYLE,
    color: colors.text.secondary,
  },

  smallContainer: {
    width: 'auto',
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  smallText: {
    fontSize: 14,
  },
});