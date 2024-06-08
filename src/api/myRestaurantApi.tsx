import { Restaurant } from "@/types/user"
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query"
import { toast } from "sonner"

const api_base_url = import.meta.env.VITE_API_BASE_URL

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createMyRestaurantRequest = async(createRestaurantData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently()
        const res = await fetch(`${api_base_url}/api/my/restaurant`, {
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${accessToken}`,
            },
            body: createRestaurantData
        })
        if(!res.ok){
            throw new Error("Failed to create restaurant")
        }

        return res.json()
    }

    const { mutate: createRestaurant, error, isSuccess, isLoading, reset } = useMutation(createMyRestaurantRequest)
    if(error){
        toast.error("Unable to update restaurant")
        reset();
    }
    if(isSuccess){
        toast.success("Restaurant Created!")
    }
    return { createRestaurant, isLoading }
}

export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const getMyRestaurantRequest = async (): Promise<Restaurant> => {
        const token = await getAccessTokenSilently()
        const res = await fetch(`${api_base_url}/api/my/restaurant`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if(!res.ok){
            throw new Error("Error fetching restaurant")
        }
        return res.json()
    }

    const { data: restaurant, isLoading } = useQuery("fetchMyRestaurantRequest", getMyRestaurantRequest)
    return { restaurant, isLoading }
}