import { Edit, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export default function CardGroup(
  name: any,
) {
  return (
    <div className="dark:bg-gray-900 shadow-md flex flex-col p-2 rounded-lg h-52 w-80">
      <div className="flex flex-col h-40 p-2">
        <h1 className="text-xl">{name.name}</h1>
        <div className="flex gap-2 items-center text-md">
          <h2>Items</h2>
          <div className="dark:text-gray-400">{name.items}</div>
        </div>
      </div>
      <div className="flex gap-2 w-full justify-center items-center">
        <Button className="font-bold">
          <Link
            to={`/dashboard/${name.id}`}
          >View</Link>
        </Button>
        <Button>
          <Edit />
        </Button>
        <Button variant={"destructive"} onClick={async () => {
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
        }}>
          <Trash2Icon />
        </Button>
      </div>
    </div>
  )
}