import { Edit, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export default function CardGroup(name: any) {
  return (
    <div className="group hover:shadow-xl transition-all duration-300 bg-card rounded-xl overflow-hidden">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">{name.name}</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Items:</span>
            <span className="text-sm font-medium">{name.items}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t">
          <Button className="flex-1" variant="default">
            <Link
              to={`/dashboard/$cardId`}
              params={{ cardId: name.id }}
              className="w-full"
            >
              View Cards
            </Link>
          </Button>
          <Button size="icon" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            onClick={async () => {
              await fetch(
                `https://myflashcard.onrender.com/deletecard/${name.id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              window.location.reload();
            }}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
