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

export const useCheckoutTransaksi = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {

            return await axiosAuth.post('/api/checkout', body)
        },
        onSuccess,
        onError
    })
}

export const usePatchTransaksi = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch('/api/transaksi?id=' + body.id)
        },
        onSuccess,
        onError
    })
}

export const usePatchCancelTransaksi = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch('/api/transaksi?id=' + body.id)
        },
        onSuccess,
        onError
    })
}