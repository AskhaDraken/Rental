import axios from "axios";
import { useSession } from "next-auth/react";

export function useRefreshToken() {
    const { data: session } = useSession()
    
    const refreshToken = async () => {
        const res = await axios.post("/api/auth/refresh", {
            refreshToken: session.user.refreshToken
        })

        if(session) {
            session.user.token = res.data.token
        }
    }
    
    return refreshToken
}