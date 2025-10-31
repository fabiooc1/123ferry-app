import { colors } from "@/constants/colors";
import React, { useEffect, useRef } from "react";
import { Animated, DimensionValue } from "react-native";

type SkeletonPieceProps = {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
};

export default function SkeletonPiece({
  width,
  height,
  borderRadius = 6,
}: SkeletonPieceProps) {
  const opacity = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        backgroundColor: colors.border.primary,
        width,
        height,
        borderRadius,
        opacity,
      }}
    />
  );
}
