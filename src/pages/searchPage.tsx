import { useParams } from "react-router-dom"
export const SearchPage = () => {
    const { city } = useParams()
    return(
        <span>User searched for {city}</span>
    )
}