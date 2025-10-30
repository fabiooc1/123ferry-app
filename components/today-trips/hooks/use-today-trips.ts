import { TripsPaginationModel } from "@/models/TripsPaginationModel";
import { tripService } from "@/services/tripService";
import { useEffect, useState } from "react";

export function useTodayTrips(routeId: number) {
  const [isLoading, setIsLoading] = useState(true)
  const [tripsPaginationData, setTripsPaginationData] =
    useState<TripsPaginationModel | null>(null);

  useEffect(() => {
    async function loadTickets() {
      try {
        setIsLoading(true)
        const currentTimestampUTC = new Date().toISOString();
        const resultData = await tripService.getAll(
          1,
          10,
          routeId,
          currentTimestampUTC
        );

        setTripsPaginationData(resultData);
      } catch (error) {
        console.error("ERROR", error);
      } finally {
        setIsLoading(false)
      }
    }

    loadTickets();
  }, [routeId]);

  return {
    tripsPaginationData,
    isLoading,
  };
}
