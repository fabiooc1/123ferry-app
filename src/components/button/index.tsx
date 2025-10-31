import { colors } from "@/constants/colors";
import { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, TextStyle, ViewStyle } from "react-native";
import { s } from './styles';

type ButtonProps = {
  variant?: 'primary';
  label?: string;
  child?: ReactNode;
  isSubmitting?: boolean;
  onPress: () => void;
};

const containerStyleMap: Record<string, ViewStyle> = {
  primary: s.primaryContainer,
};

const textStyleMap: Record<string, TextStyle> = {
  primary: s.primaryText,
};

export default function Button({
  variant = 'primary',
  onPress,
  label,
  child,
  isSubmitting = false
}: ButtonProps) {
  const containerStyle = containerStyleMap[variant];
  const textStyle = textStyleMap[variant];

  const content = child ? child : (
    <Text style={textStyle}>
      {label}
    </Text>
  );

  return (
  <Pressable
    style={({ pressed }) => [
      containerStyle,
      (pressed || isSubmitting) && { opacity: 0.8 }
    ]}
    disabled={isSubmitting}
    onPress={onPress}
  >
    {isSubmitting ? (
      <ActivityIndicator size="small" color={colors.icon.primary} />
    ) : (
      content
    )}
  </Pressable>
);
}