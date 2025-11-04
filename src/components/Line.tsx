import { colors } from "@/constants/colors";
import { View } from "react-native";

interface LineProps {
    borderWidth?: number
    borderType?: 'dashed' | 'solid',
    marginHorizontal?: number
}

export default function Line({ borderWidth = 1, borderType = 'solid', marginHorizontal = 0 }: LineProps) {
  return (
    <View
      style={{
        height: 2,
        borderWidth: borderWidth,
        borderColor: colors.border.primary,
        borderStyle: borderType,
        marginHorizontal: marginHorizontal,
      }}
    />
  );
}
