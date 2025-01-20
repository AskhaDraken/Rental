import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useFetchUser = () => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ['fetch.user.id'],
        queryFn: async () => {

            return await axiosAuth.get('/api/profil')
        }
    })
}

export const useFetchUserById = (id) => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ['fetch.user', id],
        queryFn: async () => {
            return await axiosAuth.get(`/api/profil?id=${id}`)
        }
    })
}

export const usePatchProfileImage = ({ onSuccess, onError }) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {            
            return await axiosAuth.patch('/api/profil/image', body)
        },
        onSuccess,
        onError
    })
}


