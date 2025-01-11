import useAxiosAuth from "@/hooks/useAxiosAuth"
import axios from "@/lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query"

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

export const usePostPlaystation = ({onSuccess, onError}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.post('/api/playstation', body)
        },
        onSuccess,
        onError
    })
}

export const usePatchPlaystation = ({onSuccess, onError}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch('/api/playstation?id=' + body.id, body.data)
        },
        onSuccess,
        onError
    })
}

export const useDeletePlaystation = ({onSuccess, onError}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (id) => {
            return await axiosAuth.delete('/api/playstation?id=' + id)
        },
        onSuccess,
        onError
    })
}
