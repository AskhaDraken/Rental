import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useFetchRoom = (query) => {
    
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ["fetch.room"],
        queryFn: async () => {
            return await axiosAuth.get('/api/room?value=' + query)
        }
    })
}

export const useFetchRoomById = (id) => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ["fetch.room", id],
        queryFn: async () => {
            return await axiosAuth.get('/api/room?id=' + id)
        }
    })
}

export const usePostRoom = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.post('/api/room', body)
        },
        onSuccess,
        onError
    })
}

export const usePatchRoom = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch('/api/room?id=' + body.id, body.data)
        },
        onSuccess,
        onError
    })
}

export const useDeleteRoom = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (id) => {
            return await axiosAuth.delete('/api/room?id=' + id)
        },
        onSuccess,
        onError
    })
}