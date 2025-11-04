import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

interface InfoItemProps {
  title: string;
  value: string | number;
}

export default function InfoItem({ title, value }: InfoItemProps) {
  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      <Text style={s.value}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 2,
    flexBasis: "33.33%",
    flexShrink: 0,
    flexGrow: 0,
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    color: colors.text.primary,
  },
  value: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: colors.text.secondary,
  },
});
