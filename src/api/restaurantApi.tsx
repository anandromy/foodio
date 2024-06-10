import { SearchState } from "@/pages/searchPage"
import { RestaurantSearchResponse } from "@/types/type"
import { useQuery } from "react-query"

const api_base_url = import.meta.env.VITE_API_BASE_URL

export const useSearchRestaurant = (searchState: SearchState, city?: string, ) => {
    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const params = new URLSearchParams()
        params.set("searchQuery", searchState.searchQuery)
        params.set("page", searchState.page.toString())
        const response = await fetch(`${api_base_url}/api/restaurant/search/${city}?${params.toString()}`)
        if (!response.ok){
            throw new Error("Failed to get restaurant")
        }
        return response.json()
    }

    const { data: results, isLoading } = useQuery(
        ["searchRestaurants", searchState],
        createSearchRequest,
        {
            // this query isn't going to run unitl the truthy value of city is true
            enabled: !!city
        }
    )

    return { results, isLoading }
}