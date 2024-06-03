import { useScrollPosition } from "@/hooks/useScrollPosition"
import { Link } from "react-router-dom"
import { MobileNav } from "./mobileNav"
import { DesktopNav } from "./desktopNav"

export const Header = () => {
    const scrollPosition = useScrollPosition()
    return(
        <div className="sticky top-0 bg-background py-3">
            <div className="container flex justify-between items-center">
                <Link 
                    to="/"
                    className="text-3xl font-bold tracking-tight text-primary">foodio
                </Link>
                <DesktopNav />
                <MobileNav />
            </div>
        </div>
    )
}