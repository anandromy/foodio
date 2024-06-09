import { useSearchRestaurant } from "@/api/restaurantApi"
import { useParams } from "react-router-dom"
export const SearchPage = () => {
    const { city } = useParams()
    const { results } = useSearchRestaurant(city)

    return(
        <span>User searched for {city}
            <span>{results?.data.map((restaurant) => (
                <span>
                    found - {restaurant.restaurantName}, {restaurant.city}
                </span>
            ))}</span>
        </span>
    )
}