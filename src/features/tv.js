import useAxiosAuth from "@/hooks/useAxiosAuth"
import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

export const useFetchTv = (psId) => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
         queryKey: ["fetch.tv", psId],
         queryFn: async () => {
            return await axiosAuth.get('/api/tv?psId=' + psId)
         }
    })
}