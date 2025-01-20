import useAxiosAuth from "@/hooks/useAxiosAuth"
import axios from "@/lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useFetchGame = (query) => {
    return useQuery({
        queryKey: ["fetch.game"],
        queryFn: async () => {
            return await axios.get(`/api/game?value=${query.value}&type=${query.type || null}`)
        }
    })
}
export const usePostGame = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.post('/api/game', body, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        },
        onSuccess,
        onError
    })
}

export const usePatchGame = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch('/api/game?id=' + body.id, body.data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
        },
        onSuccess,
        onError
    })
}

export const useDeleteGame = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (id) => {
            return await axiosAuth.delete('/api/game?id=' + id)
        },
        onSuccess,
        onError
    })
}
