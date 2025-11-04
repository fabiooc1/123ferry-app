import { colors } from "@/constants/colors"
import { ClipboardTextIcon } from "phosphor-react-native"
import { Text, View } from "react-native"
import { s } from "./styles"

type EmptyListProps = {
    title: string
    description: string,
    width: number | '100%'
}

export default function EmptyList({ title, description, width }: EmptyListProps) {
    return (
        <View style={[s.container, { width }]}>
            <ClipboardTextIcon size={30} color={colors.status.danger} />

            <Text style={s.title}>{title}</Text>
            <Text style={s.description}>{description}</Text>
        </View>
    )
}