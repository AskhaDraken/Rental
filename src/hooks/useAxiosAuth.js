const { useSession } = require("next-auth/react");
const { useRefreshToken } = require("./userRefreshToken");
const { useEffect } = require("react");
const { axiosInstance } = require("@/lib/axios");
const { default: config } = require("../../postcss.config.mjs");

function useAxiosAuth() {
    const { data: session } = useSession()

    const refreshToken = useRefreshToken()

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${session.user.token}`
                }
                
                return config
            }, (error) => {
                return Promise.reject(error)
            }
        )

        const responseInterceptopr = axiosInstance.interceptors.response.use(
            (response) => response, async (error) => {
                const prevRequest = error?.config

                if(error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true

                    await refreshToken()
                    prevRequest.headers['Authorization'] = `Bearer ${session.user.token}`

                    return axiosInstance(prevRequest)
                }

                return Promise.reject(error)
            }
        )

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor)
            axiosInstance.interceptors.response.eject(responseInterceptopr)
        }
    }, [session])

    return axiosInstance
}

export default useAxiosAuth