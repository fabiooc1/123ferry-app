import { UserModel } from "@/models/UserModel";
import { LoginRequestDto } from "@/services/dtos/LoginRequestDto";
import { userService } from "@/services/userService";
import { AxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  isLoadingUser: boolean;
  user: UserModel | null;
  login: (data: LoginRequestDto) => Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [user, setUser] = useState<UserModel | null>(null)

  async function fetchUser() {
    try {
      const userData = await userService.get();
      setUser(userData);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
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

  useEffect(() => {
    setIsLoadingUser(true)
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoadingUser, user, login }}>
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