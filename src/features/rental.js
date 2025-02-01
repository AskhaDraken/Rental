import useAxiosAuth from "@/hooks/useAxiosAuth"
import axios from "@/lib/axios"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useFetchRental = () => {
    const axiosAuth = useAxiosAuth()
    return useQuery({
        queryKey: ["fetch.rental"],
        queryFn: async () => {
            return axiosAuth.get("/api/rental")
        }
    })
}

export const useFetchRentalLocation = () => {
    return useQuery({
        queryKey: ["fetch.rental.location"],
        queryFn: async () => {
            return axios.get("/api/rental/location")
        }
    })
}

export const usePostRental = ({onSuccess, onError}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return axiosAuth.post("/api/rental", body)
        },
        onSuccess,
        onError
    })
}

export const usePatchRental = ({onSuccess, onError}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return axiosAuth.patch(`/api/rental?id=${body.id}`, body.data)
        },
        onSuccess,
        onError
    })
}


export const useDeleteRental = ({onSuccess, onError}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (id) => {
            return axiosAuth.delete(`/api/rental/${id}`)
        },
        onSuccess,
        onError
    })
}