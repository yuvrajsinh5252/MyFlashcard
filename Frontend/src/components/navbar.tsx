import { ModeToggle } from "./theme/mode-toggle";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export default function Navbar() {
  const { login, logout } = useKindeAuth();
  const { user, isLoading } = useKindeAuth();

  return (
    <nav>
      <div className="flex dark:bg-gray-900 shadow-md bg-white justify-around items-center p-1">
        <div>
          <div className="text-xl font-semibold">MyFlashcard</div>
        </div>
        <div className="flex p-1 items-center justify-center gap-3 w-64">
          <div className="flex gap-4">
            <div>Home</div>
            <div>About</div>
          </div>
          <ModeToggle />
          {
            user ? (
              <div className="flex gap-4">
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <img
                        src={user.picture!}
                        alt="profile"
                        className="h-8 w-8 rounded-full"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <div onClick={() => logout()} className="cursor-pointer">logout</div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : (
              <div>
                {
                  isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <Button onClick={() => login()} type="button">Log In</Button>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </nav >
  );
}