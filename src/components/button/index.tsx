import { colors } from "@/constants/colors";
import React, { ReactNode } from "react";
import { ActivityIndicator, Pressable, Text, TextStyle, ViewStyle } from "react-native";
import { s } from './styles';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  label?: string;
  children?: ReactNode;
  isSubmitting?: boolean;
  size?: 'full' | 'small' | 'icon';
  onPress: () => void;
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
  icon: s.iconContainer,
};

const sizeTextStyleMap: Record<string, TextStyle> = {
  full: {},
  small: s.smallText,
  icon: {},
};

export default function Button({
  variant = 'primary',
  onPress,
  label,
  children,
  isSubmitting = false,
  size = 'full'
}: ButtonProps) {

  const containerStyle = containerStyleMap[variant];
  const textStyle = textStyleMap[variant];
  const sizeContainerStyle = sizeContainerStyleMap[size];
  const sizeTextStyle = sizeTextStyleMap[size];

  const contentColor = textStyle.color || colors.text.primary;

  let content: ReactNode;

  if (children) {
    if (React.isValidElement(children)) {
      content = React.cloneElement(children as React.ReactElement<any>, {
        color: contentColor,
      });
    } else {
      content = children;
    }
  } else {
    content = (
      <Text style={[textStyle, sizeTextStyle]}>
        {label}
      </Text>
    );
  }

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
        <ActivityIndicator size="small" color={contentColor} />
      ) : (
        content
      )}
    </Pressable>
  );
}