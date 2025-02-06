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
import { Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
  const { loginWithRedirect, logout } = useAuth0();
  const { user, isLoading } = useAuth0();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex gap-3 mr-6 items-center">
          <img
            src="/icon.png"
            className="h-8 w-8 hover:scale-110 transition-transform"
            alt="icon"
          />
          <div className="text-xl font-bold hidden md:block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            MyFlashcard
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-between">
          <div className="flex gap-8">
            <Link
              to="/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary relative group"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <ModeToggle />
            {isLoading ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img
                    src={user.picture!}
                    alt="profile"
                    className="h-10 w-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
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
                      className="cursor-pointer flex items-center w-full"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => loginWithRedirect()}
                type="button"
                className="font-semibold hover:scale-105 transition-transform"
              >
                Log In
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 pt-4">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <ModeToggle />
                {isLoading ? (
                  <Skeleton className="h-8 w-28" />
                ) : user ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={user.picture!}
                      alt="profile"
                      className="h-8 w-8 rounded-full ring-2 ring-primary/20"
                    />
                    <Button
                      onClick={() => logout()}
                      className="flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => loginWithRedirect()}
                    className="font-semibold"
                  >
                    Log In
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
