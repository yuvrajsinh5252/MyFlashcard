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
import { Plus } from "lucide-react";
import AddCard from "@/components/AddCard";
import GetCards from "@/components/Getcards";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingSpinner } from "@/components/ui/loading";

export const Route = createFileRoute("/dashboard_/")({
  component: Dashboard,
});

function Dashboard() {
  const { isLoading } = useAuth();
  const { user, isLoading: l } = useAuth0();

  if (isLoading || l) return <LoadingSpinner />;

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 md:px-8 lg:px-16 xl:px-32 py-8 bg-background transition-all duration-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 mb-8 bg-card rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
        <div className="flex flex-col space-y-3 mb-4 md:mb-0">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            FlashCards
          </h1>
          <p className="text-sm text-muted-foreground max-w-md">
            Get started by clicking on cards and learn with the flow of
            flashcards. Create your own collection and master any subject.
          </p>
        </div>
        <Dialog>
          <DialogTrigger>
            <div
              className={
                buttonVariants({ size: "lg" }) +
                " group flex items-center gap-2 hover:scale-105 transition-all duration-200"
              }
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-all duration-200" />
              Add Card
            </div>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-[1000px] scale-100 transition-all duration-200">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create Card</DialogTitle>
              <DialogDescription className="text-base">
                Add a new card to your collection and expand your knowledge
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
