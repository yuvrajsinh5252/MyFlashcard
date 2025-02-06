import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/dbhooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCard from "@/components/AddCard";
import GetCards from "@/components/Getcards";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useAuth0 } from "@auth0/auth0-react";

export const Route = createFileRoute("/dashboard_/")({
  component: Dashboard,
});

function Dashboard() {
  const { isLoading } = useAuth();
  const { user, isLoading: l } = useAuth0();
  if (isLoading || l) return <div>Loading...</div>;

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 md:px-8 lg:px-16 xl:px-32 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 mb-8 bg-card rounded-lg shadow-sm">
        <div className="flex flex-col space-y-2 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold tracking-tight">FlashCards</h1>
          <p className="text-sm text-muted-foreground">
            Get started by clicking on cards and learn with the flow of
            flashcards
          </p>
        </div>
        <Dialog>
          <DialogTrigger>
            <div className={buttonVariants({ size: "lg" })}>Add Card</div>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[1000px]">
            <DialogHeader>
              <DialogTitle>Create Card</DialogTitle>
              <DialogDescription>
                Add a new card to your collection
              </DialogDescription>
            </DialogHeader>
            {user ? <AddCard user={user} /> : <></>}
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full">
        <GetCards user={user} />
      </div>
    </div>
  );
}
