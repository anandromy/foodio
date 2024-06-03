import { useCreateMyUser } from "@/api/myUserApi"
import { useAuth0 } from "@auth0/auth0-react"
import { LoaderIcon } from "lucide-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

export const AuthCallbackPage = () => {
    const navigate = useNavigate()
    const { user } = useAuth0()
    const { createUser } = useCreateMyUser()

    const hasCreatedUser = useRef(false)

    useEffect(() => {
        if(user?.sub && user?.email && !hasCreatedUser.current){
            createUser({ auth0Id: user.sub, email: user.email })
            hasCreatedUser.current = true
        }
        navigate("/")
    }, [createUser, navigate, user])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <LoaderIcon className="animate-spin" />
        </div>
    )
}