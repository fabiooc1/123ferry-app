import { jwtKeyPath } from "@/constants/security";
import { UserModel } from "@/models/UserModel";
import { LoginRequestDto } from "@/services/dtos/LoginRequestDto";
import { userService } from "@/services/userService";
import { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { deleteItemAsync } from "expo-secure-store";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";


type AuthContextProps = {
  isLoadingUser: boolean;
  user: UserModel | null;
  setUser: Dispatch<SetStateAction<UserModel | null>>
  login: (data: LoginRequestDto) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [user, setUser] = useState<UserModel | null>(null)

  const navigate = useRouter()

  async function fetchUser() {
    try {
      const userData = await userService.get();
      setUser(userData);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          await deleteItemAsync(jwtKeyPath)
          setUser(null);
          return;
        }
      }
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function login(data: LoginRequestDto) {
    await userService.login(data);
    await fetchUser();
  }

  async function logout() {
    await deleteItemAsync(jwtKeyPath)
    setUser(null)
    navigate.replace("/(auth)/login")
  }

  useEffect(() => {
    setIsLoadingUser(true)
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoadingUser, user, login, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)

    if (!ctx) {
        throw new Error("Use Auth must be used with AuthProvider")
    }

    return ctx
}