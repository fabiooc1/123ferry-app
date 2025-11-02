import { api } from "@/lib/axios";
import { TicketModel } from "@/models/TicketModel";
import { TicketsPaginationModel } from "@/models/TicketsPaginationModel";
import { AxiosError } from "axios";
import { CreateTicketDto } from "./dtos/CreateTicketDto";

class TicketService {
  async create(body: CreateTicketDto) {
    try {
      const response = await api.post("/passagem", body);

      return response.data as TicketModel;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }

      throw new Error("Serviço fora do ar. Tente novamente mais tarde");
    }
  }

  async get(ticketCode: string) {
    try {
      const response = await api.get(`/passagem/${ticketCode}`);

      if (response.status !== 200) {
        throw new Error("Não foi possível buscar sua passagem");
      }

      return response.data as TicketModel;
    } catch {
      throw new Error("Serviço fora do ar. Tente novamente mais tarde");
    }
  }

  async getAll(
    page: number,
    pageSize: number,
  ): Promise<TicketsPaginationModel> {
    try {
      const response = await api.get("/passagem", {
        params: {
          page,
          pageSize,
        },
      });

      if (response.status !== 200) {
        throw new Error("Não foi possível buscar as suas passagens");
      }

      return response.data as TicketsPaginationModel;
    } catch {
      throw new Error("Serviço fora do ar. Tente novamente mais tarde");
    }
  }
}

export const ticketService = new TicketService();
