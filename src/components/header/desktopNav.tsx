import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "../ui/button"
import { UserNameMenu } from "../userNameMenu"

export const DesktopNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0()
    return(
        <span className="hidden md:flex space-x-2 items-center">
            {
                isAuthenticated ? (
                    <UserNameMenu />
                ): (
                    <Button onClick={async() => await loginWithRedirect()}>
                    Log In
                    </Button>
                )
            }
        </span>
    )
}