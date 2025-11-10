import { jwtKeyPath } from "@/constants/security";
import { api } from "@/lib/axios";
import { UserModel } from "@/models/UserModel";
import { AxiosError } from "axios";
import { setItemAsync } from "expo-secure-store";
import { CreateUserRequestDto } from "./dtos/CreateUserRequestDto";
import { LoginRequestDto } from "./dtos/LoginRequestDto";
import { UpdateUserDto } from "./dtos/UpdateUserDto";
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
        throw new ValidationError({
          field: 'email',
          message: "Credénciais inválidas"
        })
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

  async update(body: UpdateUserDto): Promise<UserModel> {
    try {
      const response = await api.put("/usuario", body);
      return response.data as UserModel
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 409 || error.status === 400) {
            throw new ValidationError(error.response?.data)
        }
      }

      throw error;
    }
  }
}

export const userService = new UserService();
