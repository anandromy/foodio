import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"
import { SearchBar, formSchema } from "@/components/searchBar"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
export const Home = () => {

    const navigate = useNavigate()

    const handleSearchSubmit = (searchFormValues: z.infer<typeof formSchema>) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`
        })
    } 

    return(
        <div className="flex flex-col gap-12">
            <div className="bg-background rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-8 md:-mt-16">
                <h1 className="text-3xl md:text-5xl font-bold text-primary tracking-tight">
                    Tuck into a takeaway today
                </h1>
                <span className="text-xl">
                    Food is just a click away!
                </span>
                <SearchBar placeholder="Search by City or Town" onSubmit={handleSearchSubmit} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order takeaway even faster!
                    </span>
                    <span>
                        Download foodio for faster ordering and personalised recommendations
                    </span>
                    <img src={appDownloadImage} />
                </div>
            </div>
        </div>
    )
}