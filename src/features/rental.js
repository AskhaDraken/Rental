import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useMutation } from "@tanstack/react-query"

export const usePostRental = ({onSuccess}) => {
    const axiosAuth = useAxiosAuth()
    return useMutation({
        mutationFn: async (body) => {
            return axiosAuth.post("/api/rental", body)
        },
        onSuccess
    })
}