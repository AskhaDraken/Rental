import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useFetchTransaksi = () => {
    const axiosAuth = useAxiosAuth()

    return useQuery({
        queryKey: ["fetch.transaksi"],
        queryFn: async () => {
            return await axiosAuth.get('/api/transaksi')
        }
    })
}

export const useCheckoutTransaksi = () => {
    const axiosAuth = useAxiosAuth()

    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.post('/api/transaksi', body)
        }
    })
}