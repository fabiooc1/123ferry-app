import { PassagerTypeModel } from "@/models/PassagerTypeModel"
import { tripService } from "@/services/tripService"
import { useEffect, useState } from "react"

export function usePassagerTypes() {
    const [passagerTypes, setPassagerTypes] = useState<PassagerTypeModel[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    async function loadPassagerTypes() {
        try {
            setIsLoading(true)
            const passagerTypesData = await tripService.getAllPassagerTypes()
            setPassagerTypes(passagerTypesData)
        } catch {
            setPassagerTypes([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadPassagerTypes()
    }, [])

    return {
        passagerTypes,
        isLoading
    }
}