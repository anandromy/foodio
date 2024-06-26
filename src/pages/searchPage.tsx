import { useSearchRestaurant } from "@/api/restaurantApi"
import { CuisineFilter } from "@/components/cuisineFilter"
import { PaginationSelector } from "@/components/paginationSelector"
import { SearchBar } from "@/components/searchBar"
import { SearchResultCard } from "@/components/searchResultCard"
import { SearchResultsInfo } from "@/components/searchResultsInfo"
import { SortOptionDropdown } from "@/components/sortOptionDropdown"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
    searchQuery: string
    page: number,
    selectedCuisines: string[],
    sortOption: string
}

export type SearchForm = {
    searchQuery: string
}

export const SearchPage = () => {
    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    })
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const { results, isLoading } = useSearchRestaurant(searchState, city)

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1
        }))
    }
    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1
        }))
    }
    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page
        }))
    }
    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1
        }))
    }
    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1
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
                <CuisineFilter selectedCuisines={searchState.selectedCuisines} onChange={setSelectedCuisines} isExpanded={isExpanded} onExpandedClicked={() => setIsExpanded(!isExpanded)} />  
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar onSubmit={setSearchQuery} placeholder="Search by cuisines or restaurant name" onReset={resetSearch} searchQuery={searchState.searchQuery} />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultsInfo city={city} total={results.pagination.total} />
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>
                {results.data.map((restaurant) => (
                    <SearchResultCard restaurant={restaurant} />
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    )
}