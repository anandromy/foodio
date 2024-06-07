import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"

const api_base_url = import.meta.env.VITE_API_BASE_URL

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createMyRestaurantRequest = async(createRestaurantData: FormData) => {
        const accessToken = await getAccessTokenSilently()
        const res = await fetch(`${api_base_url}/api/my/restaurant`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${accessToken}`,
                "Content-Type" : "application/json"
            },
            body: createRestaurantData
        })
        if(!res.ok){
            throw new Error("Failed to create restaurant")
        }
    }

    const { mutateAsync: createRestaurant, error, isSuccess, isLoading, reset } = useMutation(createMyRestaurantRequest)
    if(error){
        toast.error(error.toString())
        reset();
    }
    return { createRestaurant, isLoading, isSuccess }
}