import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useMutation } from "@tanstack/react-query"

export const usePostGame = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.post('/api/game', body)
        },
        onSuccess,
        onError
    })
}

export const usePatchGame = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch('/api/game?id=' + body.id, body.data)
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
