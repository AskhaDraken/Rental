import { signOut } from "next-auth/react"

export const usePostLogout = () => {
    signOut()
    sessionStorage.clear()
    localStorage.clear()
}