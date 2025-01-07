import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchPlaystation = () => {
    return useQuery({
        queryKey: ["fetch.playstation"],
        queryFn: async () => {
            return await axios.get('/api/playstation')
        }
    })
}