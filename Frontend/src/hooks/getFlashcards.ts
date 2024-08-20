import { useEffect, useState } from "react";

export default function getFlashcards(groupId: any) {
  const [flashcards, setFlashcards] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function fetchFlashcards() {
    fetch(`https://myflashcard.onrender.com/fetchcard/${groupId}`, {
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

  console.log(flashcards);

  return { flashcards, isLoading };
}
