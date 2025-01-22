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

export const useFetchGameFavorit = () => {
    return useQuery({
        queryKey: ["fetch.game.favorit"],
        queryFn: async () => {
            return await axios.get("/api/game/favorit")
        }
    })
}

export const useFetchGamePublic = () => {
    return useQuery({
        queryKey: ["fetch.game.public"],
        queryFn: async () => {
            return await axios.get(`/api/game/public`)
        }
    })
}

export const useFetchGamePublicById = (id) => {
    return useQuery({
        queryKey: ["fetch.game.public",id],
        queryFn: async () => {
            return await axios.get(`/api/game/public?id=${id}`)
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

export const usePatchGameFavorit = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch('/api/game/favorit?id=' + body.id, {type: 'add'})
        },
        onSuccess,
        onError
    })
}

export const useDeleteGameFavorit = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return await axiosAuth.patch('/api/game/favorit?id=' + body.id, {type: 'delete'})
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
