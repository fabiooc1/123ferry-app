import { UserModel } from "@/models/UserModel";
import { userService } from "@/services/userService";
import { AxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  isLoadingUser: boolean;
  user: UserModel | null;
}

const AuthContext = createContext({} as AuthContextProps)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [user, setUser] = useState<UserModel | null>(null)

  useEffect(() => {
    setIsLoadingUser(true)

    userService.get()
    .then(userData => {
        setUser(userData)
    })
    .catch(error => {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          setUser(null)
          return
        }
      }
    })
    .finally(() => {
        setIsLoadingUser(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ isLoadingUser, user }}>
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