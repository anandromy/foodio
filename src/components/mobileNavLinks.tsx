import { Link } from "react-router-dom"

export const MobileNavLinks = () => {
    return(
        <>
            <Link to="/user-profile" className="flex bg-white items-center font-bold hover:text-primary py-2 rounded text-center">
                User Profile
            </Link>
        </>
    )
}