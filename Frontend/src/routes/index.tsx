import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-32">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent leading-tight">
            Master Your Learning <br />
            With Flashcards
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Create, study, and track your progress with a simple and effective
            flashcard system.
          </p>
          <p className="text-sm text-yellow-600 dark:text-yellow-500 max-w-xl mx-auto">
            ⚠️ Note: Initial response times may be slower as our backend is
            hosted on a free platform.
          </p>
          <Button
            size="lg"
            onClick={() =>
              loginWithRedirect({ appState: { returnTo: "/dashboard" } })
            }
            className="mt-8"
          >
            Create Your First Deck
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
