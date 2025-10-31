import { jwtKeyPath } from "@/constants/security";
import { api } from "@/lib/axios";
import { UserModel } from "@/models/UserModel";
import { AxiosError } from "axios";
import { setItemAsync } from "expo-secure-store";
import { CreateUserRequestDto } from "./dtos/CreateUserRequestDto";
import { LoginRequestDto } from "./dtos/LoginRequestDto";
import { ValidationError } from "./errors/ValidationError";

class UserService {
  async login(data: LoginRequestDto): Promise<void> {
    try {
      const response = await api.post("/auth/login", {
        login: data.email,
        senha: data.password,
      });

      const token: string = response.data.token;
      await setItemAsync(jwtKeyPath, token);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Credenciais inválidas", {
          cause: Number(error.status),
        });
      }

      throw error;
    }
  }

  async create(data: CreateUserRequestDto): Promise<UserModel> {
    try {
      const response = await api.post("/usuario", data);
      return response.data as UserModel
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 409 || error.status === 400) {
            console.log(error.response?.data)
            throw new ValidationError(error.response?.data)
        }
      }

      throw error;
    }
  }

  async get(): Promise<UserModel> {
    try {
      const response = await api.get("/usuario/me");
      return response.data as UserModel
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
