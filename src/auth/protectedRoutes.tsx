import { useAuth0 } from "@auth0/auth0-react"
import { LoaderIcon } from "lucide-react"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth0()
    if(isLoading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoaderIcon className="animate-spin" />
            </div>
        )
    }

    if(isAuthenticated){
        return <Outlet />
    }
    
    return <Navigate to="/" replace />
}