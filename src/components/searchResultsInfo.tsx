import { Link } from "react-router-dom"

type Props = {
    total: number
    city: string
}

export const SearchResultsInfo = ({ total, city }: Props) => {
    return(
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>
                {total} Restaurants found in {city}
                <Link className="text-sm font-semibold underline cursor-pointer text-blue-500 ml-1" to="/">Change Location</Link>
            </span>
            inset sort dropdown here
        </div>
    )
}