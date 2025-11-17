import { TicketsPaginationModel } from "@/models/TicketsPaginationModel";
import { ticketService } from "@/services/ticketService";
import { useEffect, useState } from "react";

export function useUserTickets() {
  const [isLoading, setIsLoading] = useState(true);
  const [ticketsPaginationData, setTicketsPaginationData] =
    useState<TicketsPaginationModel | null>(null);

  async function loadTickets() {
    try {
      setIsLoading(true);
      const resultData = await ticketService.getAll(1, 10);

      setTicketsPaginationData(resultData);
    } catch (error) {
      console.error("ERROR", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();

    return () => {
      setTicketsPaginationData(null);
      setIsLoading(true);
    };
  }, []);

  return {
    ticketsPaginationData,
    isLoading,
    loadTickets,
  };
}
