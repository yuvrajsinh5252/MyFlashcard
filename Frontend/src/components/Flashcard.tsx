import getFlashcards from "@/hooks/getFlashcards";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Flashcard() {
  const location = useLocation();
  const [id, setId] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const id = location.pathname.split("/").pop();
    setId(id!);
  }, [location.pathname]);

  const { flashcards = [], isLoading }: { flashcards: any[], isLoading: boolean } = getFlashcards(id) as { flashcards: any[], isLoading: boolean };
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex shadow-md rounded-lg justify-center items-center h-[calc(100vh-4rem)]">
      <div className="p-4">
        <div className="flex flex-col gap-4 mt-4 bg-gray-900 p-4 rounded-lg">
          {flashcards.map((card: any) => (
            <div key={card.id} className="flex flex-col gap-2">
              <h2 className="text-lg font-medium" onClick={
                () => setShowAnswer(!showAnswer)
              }>{
                  showAnswer ? card.answer : card.question
                }</h2>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4">Prev</button>
          <div>
            <div>
              <p>Question {flashcards.findIndex((card: any) => showAnswer ? card.answer : card.question) + 1} of {flashcards.length}</p>
            </div>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4">Next</button>
        </div>
      </div>
    </div>
  )
}