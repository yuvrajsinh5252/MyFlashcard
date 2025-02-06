import { ModeToggle } from "./theme/mode-toggle";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
  const { loginWithRedirect, logout } = useAuth0();
  const { user, isLoading } = useAuth0();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex gap-2 mr-4">
          <img src="/icon.png" className="h-8 w-8" alt="icon" />
          <div className="text-xl font-semibold hidden md:block">
            MyFlashcard
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex gap-6">
            <Link
              to="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img
                    src={user.picture!}
                    alt="profile"
                    className="h-10 w-10 rounded-full"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div
                      onClick={() =>
                        logout({
                          logoutParams: {
                            returnTo: window.location.origin,
                          },
                        })
                      }
                      className="cursor-pointer"
                    >
                      logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div>
                {isLoading ? (
                  <div>Loading...</div>
                ) : (
                  <Button onClick={() => loginWithRedirect()} type="button">
                    Log In
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4">
                <Link to="/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/" className="text-sm font-medium">
                  Home
                </Link>
                <ModeToggle />
                {user ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={user.picture!}
                      alt="profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <Button onClick={() => logout()}>Logout</Button>
                  </div>
                ) : (
                  <Button onClick={() => loginWithRedirect()}>Log In</Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
