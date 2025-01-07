import useAxiosAuth from "@/hooks/useAxiosAuth"
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

export const usePostRental = ({onSuccess}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return axiosAuth.post("/api/rental", body)
        },
        onSuccess
    })
}


export const useDeleteRental = ({onSuccess}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (id) => {
            return axiosAuth.delete(`/api/rental/${id}`)
        },
        onSuccess
    })
}