import { useSearchRestaurant } from "@/api/restaurantApi"
import { SearchResultCard } from "@/components/searchResultCard"
import { SearchResultsInfo } from "@/components/searchResultsInfo"
import { LoaderIcon } from "lucide-react"
import { useParams } from "react-router-dom"
export const SearchPage = () => {
    const { city } = useParams()
    const { results, isLoading } = useSearchRestaurant(city)
    if(isLoading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoaderIcon className="animate-spin" />
            </div>
        )
    }

    if(!results?.data || !city){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span>No results found</span>
            </div>
        )
    }
    return(
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                inset cusinies here   
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchResultsInfo city={city} total={results.pagination.total} />
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} />
                ))}
            </div>
        </div>
    )
}