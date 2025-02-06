import { Edit, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export default function CardGroup(name: any) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this flashcard set?"))
      return;

    setIsDeleting(true);
    try {
      await fetch(`http://localhost:3000/deletecard/${name.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      toast({
        title: "Success",
        description: "Flashcard set deleted successfully",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete flashcard set",
        variant: "destructive",
      });
    }
    setIsDeleting(false);
  };

  return (
    <Link
      to={`/dashboard/$cardId`}
      params={{ cardId: name.id }}
      className="block group"
    >
      <div className="p-4 rounded-lg bg-background hover:bg-muted/50 transition-all duration-200 border hover:border-primary/20">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="font-medium truncate text-lg">{name.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {name.items} {name.items === 1 ? "card" : "cards"}
              </span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Click to view
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:bg-secondary"
                  onClick={(e) => e.preventDefault()}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit set</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  disabled={isDeleting}
                  onClick={handleDelete}
                >
                  <Trash2Icon
                    className={`h-4 w-4 ${isDeleting ? "animate-spin" : ""}`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete set</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </Link>
  );
}
