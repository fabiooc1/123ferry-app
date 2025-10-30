import { TripsPaginationModel } from "@/models/TripsPaginationModel";
import { tripService } from "@/services/tripService";
import { useEffect, useState } from "react";

export function useTodayTrips(routeId: number) {
  const [tripsPaginationData, setTripsPaginationData] =
    useState<TripsPaginationModel | null>(null);

  async function loadTickets() {
    try {
      setTripsPaginationData(null);
      const currentTimestampUTC = new Date().toISOString();
      const result = await tripService.getAll(
        1,
        3,
        routeId,
        currentTimestampUTC
      );

      setTripsPaginationData(result);
    } catch (error) {
      console.error("ERROR", error);
    }
  }

  useEffect(() => {
    loadTickets();
  }, []);

  return {
    tripsPaginationData,
  };
}
