import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CircleUserRoundIcon, MenuIcon } from "lucide-react"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import { MobileNavLinks } from "../mobileNavLinks"

export function MobileNav() {
  const { isAuthenticated, logout, loginWithRedirect, user } = useAuth0()
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <MenuIcon strokeWidth={2} className="text-primary" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{
            isAuthenticated ? (
              <span className="flex items-center gap-2">
                <CircleUserRoundIcon className="hover:text-primary" />
                {user?.email}
              </span>
            ): (
              <span>Welcome to foodio.com</span>
            )
          }</SheetTitle>
        </SheetHeader>
        <Separator />
       <SheetDescription className="flex flex-col gap-4">
        {isAuthenticated ? (
          <MobileNavLinks />
        ): (
          <Button onClick={async() => await loginWithRedirect()} className="w-full">Log In</Button>
        )}
       </SheetDescription>
       {
        isAuthenticated && (
          <SheetFooter className="self-end">
            <Button onClick={async() => await logout()} className="w-full">
              Log Out
            </Button>
          </SheetFooter>
        )
       }
      </SheetContent>
    </Sheet>
  )
}
