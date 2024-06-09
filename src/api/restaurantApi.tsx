import { RestaurantSearchResponse } from "@/types/type"
import { useQuery } from "react-query"

const api_base_url = import.meta.env.VITE_API_BASE_URL

export const useSearchRestaurant = (city?: string) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const response = await fetch(`${api_base_url}/api/restaurant/search/${city}`)
        if (!response.ok){
            throw new Error("Failed to get restaurant")
        }
        return response.json()
    }

    const { data: results, isLoading } = useQuery(
        ["searchRestaurants"],
        createSearchRequest,
        {
            // this query isn't going to run unitl the truthy value of city is true
            enabled: !!city
        }
    )

    return { results, isLoading }
}