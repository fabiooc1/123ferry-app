import { colors } from "@/constants/colors"
import { SelectionSlashIcon } from "phosphor-react-native"
import { Text, View } from "react-native"
import { s } from "./styles"

type EmptyListProps = {
    title: string
    description: string,
    width: number
}

export default function EmptyList({ title, description, width }: EmptyListProps) {
    return (
        <View style={[s.container, { width }]}>
            <SelectionSlashIcon size={20} color={colors.status.error} />

            <Text style={s.title}>{title}</Text>
            <Text style={s.description}>{description}</Text>
        </View>
    )
}