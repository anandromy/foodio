import { DropdownMenu, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { useAuth0 } from "@auth0/auth0-react"
import { CircleUserRoundIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

export const UserNameMenu = () => {
    const { user, logout } = useAuth0()
    return(
        <DropdownMenu>
        <DropdownMenuTrigger className="px-3 font-normal">
            <CircleUserRoundIcon className="hover:text-primary" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/user-profile" className="hover:text-primary">User profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/manage-restaurant" className="hover:text-primary">Manage Restaurant</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={async() => await logout()} className="w-full">
                Log Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    )
}