import { colors } from "@/constants/colors";
import { Link } from "expo-router";
import { BellIcon } from "phosphor-react-native";
import { Text, View } from "react-native";
import { s } from "./styles";

export default function Header() {
    return (
        <View style={s.container}>
            <Text style={s.label}>
                Olá, Fábio
            </Text>

            <Link href="/notifications">
              <BellIcon weight="fill" color={colors.icon.primary} />
            </Link>
        </View>
    )
}