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
        <div className="flex gap-2">
          <img src="/icon.png" className="h-8 w-8" alt="icon" />
          <div className="text-xl font-semibold">MyFlashcard</div>
        </div>
        <div className="flex p-1 items-center divide-x-2 justify-center gap-3 w-96">
          <div className="flex gap-4 pr-2">
            <a href="/root">Dashboard</a>
            <a href="/">Home</a>
            <a href="/">About</a>
          </div>
          <div className="flex px-2 gap-2 justify-center items-center">
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
                          className="h-10 w-10 rounded-full"
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
      </div>
    </nav >
  );
}