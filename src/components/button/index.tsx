import { colors } from "@/constants/colors";
import { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, TextStyle, ViewStyle } from "react-native";
import { s } from './styles';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  label?: string;
  child?: ReactNode;
  isSubmitting?: boolean;
  onPress: () => void;
  size?: 'full' | 'small';
};

const containerStyleMap: Record<string, ViewStyle> = {
  primary: s.primaryContainer,
  secondary: s.secondaryContainer,
};

const textStyleMap: Record<string, TextStyle> = {
  primary: s.primaryText,
  secondary: s.secondaryText,
};

const sizeContainerStyleMap: Record<string, ViewStyle> = {
  full: {},
  small: s.smallContainer,
};

const sizeTextStyleMap: Record<string, TextStyle> = {
  full: {},
  small: s.smallText,
};

export default function Button({
  variant = 'primary',
  onPress,
  label,
  child,
  isSubmitting = false,
  size = 'full'
}: ButtonProps) {

  const containerStyle = containerStyleMap[variant];
  const textStyle = textStyleMap[variant];

  const sizeContainerStyle = sizeContainerStyleMap[size];
  const sizeTextStyle = sizeTextStyleMap[size];

  const content = child ? child : (
    <Text style={[textStyle, sizeTextStyle]}>
      {label}
    </Text>
  );

  return (
    <Pressable
      style={({ pressed }) => [
        containerStyle,
        sizeContainerStyle,
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