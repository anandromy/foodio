import { useSearchRestaurant } from "@/api/restaurantApi"
import { SearchBar } from "@/components/searchBar"
import { SearchResultCard } from "@/components/searchResultCard"
import { SearchResultsInfo } from "@/components/searchResultsInfo"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
    searchQuery: string
}

export type SearchForm = {
    searchQuery: string
}

export const SearchPage = () => {
    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: ""
    })
    const { results, isLoading } = useSearchRestaurant(searchState, city)
    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery
        }))
    }
    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: ""
        }))
    }
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
                <SearchBar onSubmit={setSearchQuery} placeholder="Search by cuisines or restaurant name" onReset={resetSearch} searchQuery={searchState.searchQuery} />
                <SearchResultsInfo city={city} total={results.pagination.total} />
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} />
                ))}
            </div>
        </div>
    )
}