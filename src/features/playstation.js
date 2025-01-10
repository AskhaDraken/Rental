import useAxiosAuth from "@/hooks/useAxiosAuth"
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

export const useFetchPlaystationById = (id) => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ["fetch.playstation", id],
        queryFn: async () => {
            return await axiosAuth.get('/api/playstation?id=' + id)
        }
    })
}

