import { SERVER_URL } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function getFlashcards(groupId: any) {
  const [flashcards, setFlashcards] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function fetchFlashcards() {
    fetch(`${SERVER_URL}/fetchcard/${groupId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setFlashcards(data);
      });
  }

  useEffect(() => {
    fetchFlashcards();
  }, [groupId]);

  return { flashcards, isLoading };
}
