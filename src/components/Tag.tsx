import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export type TagVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface TagProps {
  label: string;
  variant?: TagVariant;
}

const variantStylesMap = {
  default: {
    backgroundColor: colors.bg.secondary,
    borderColor: colors.border.primary,
    color: colors.text.secondary,
  },
  success: {
    backgroundColor: colors.status.successBg,
    borderColor: colors.status.success,
    color: colors.status.success,
  },
  warning: {
    backgroundColor: colors.status.warningBg,
    borderColor: colors.status.warning,
    color: colors.status.warning,
  },
  danger: {
    backgroundColor: colors.status.dangerBg,
    borderColor: colors.status.danger,
    color: colors.status.danger,
  },
  info: {
    backgroundColor: colors.status.infoBg,
    borderColor: colors.status.info,
    color: colors.status.info,
  },
};

export default function Tag({ label, variant = "default" }: TagProps) {
  const styles = variantStylesMap[variant];

  return (
    <View
      style={[
        s.tagContainer,
        {
          backgroundColor: styles.backgroundColor,
          borderColor: styles.borderColor,
        },
      ]}
    >
      <Text style={[s.tagText, { color: styles.color }]}>{label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  tagContainer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  tagText: {
    fontSize: 12,
    fontFamily: "Inter-Bold",
  },
});