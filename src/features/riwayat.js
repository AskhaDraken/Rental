import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useQuery } from "@tanstack/react-query"

export const useFetchRiwayat = () => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ["fetch.riwayat"],
        queryFn: async () => {
            return await axiosAuth.get('/api/transaksi/riwayat')
        }
    })
}