import useAxiosAuth from "@/hooks/useAxiosAuth"
import axios from "@/lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useFetchTv = (psId) => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ["fetch.tv", psId],
        queryFn: async () => {
            return await axiosAuth.get('/api/tv?psId=' + psId)
        }
    })
}

export const useFetchTvById = (id) => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ["fetch.tv.id", id],
        queryFn: async () => {
            return await axiosAuth.get('/api/tv?id=' + id)
        }
    })
}

export const usePostTv = ({onSuccess, onError}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.post('/api/tv', body)
        },
        onSuccess,
        onError
    })
}

export const usePatchTv = ({onSuccess, onError}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch('/api/tv?id=' + body.id, body.data)
        },
        onSuccess,
        onError
    })
}

export const useDeleteTv = ({onSuccess, onError}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({

        mutationFn: async (id) => {
            return await axiosAuth.delete('/api/tv?id=' + id)
        },
        onSuccess,
        onError
    })
}