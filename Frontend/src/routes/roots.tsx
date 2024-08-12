import { buttonVariants } from "@/components/ui/button"
import { useAuth } from "@/hooks/dbhooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddCard from "@/components/AddCard";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import GetCards from "@/components/Getcards";


function Root() {
  const { isLoading } = useAuth();
  const { user, isLoading: l } = useKindeAuth();
  if (isLoading || l) return <div>Loading...</div>;

  return (
    <div className="h-[calc(100vh-4rem)] divide-y-2 mr-96 ml-96">
      <div className="flex justify-between items-center p-2 mt-10">
        <div className="flex flex-col">
          <div className="text-2xl font-bold">FlashCards</div>
          <p className="text-sm">
            Get started by clicking on cards and learn with the flow of flashcards
          </p>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <div className={
                buttonVariants({
                  variant: "default",
                })
              }>
                Add Card
              </div>
            </DialogTrigger>
            <DialogContent className="w-[1000px] ">
              <DialogHeader>
                <DialogTitle>Card</DialogTitle>
              </DialogHeader>
              {
                user ? <AddCard user={user} /> : <></>
              }
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 p-4">
        <GetCards user={user} />
      </div>
    </div>
  )
}

export default Root
