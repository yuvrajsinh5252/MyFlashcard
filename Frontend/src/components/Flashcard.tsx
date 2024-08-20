import getFlashcards from "@/hooks/getFlashcards";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Flashcard() {
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const id = location.pathname.split("/").pop();
    setId(id!);
  }, [location.pathname]);

  const { flashcards = [], isLoading }: { flashcards: any[], isLoading: boolean } = getFlashcards(id) as { flashcards: any[], isLoading: boolean };
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex shadow-md rounded-lg justify-center items-center h-[calc(100vh-4rem)]">
      <div className="p-4">
        <div
          onClick={() => setShowAnswer(!showAnswer)}
          className="flex flex-col items-center justify-center gap-4 mt-4 h-[400px] w-[600px] bg-gray-900 p-4 rounded-lg"
        >
          <h2 className="text-white text-2xl transition-all duration-500 ease-in-out transform hover:scale-105"
          >{showAnswer ? flashcards[step].answer : flashcards[step].question}</h2>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4" onClick={() => {
            setStep(step - 1);
            setShowAnswer(false);
          }} disabled={step === 0}>Prev</button>
          <div><p>{step + 1} / {flashcards.length}</p></div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4" onClick={() => {
            setStep(step + 1)
            setShowAnswer(false);
          }} disabled={step === flashcards.length - 1}>Next</button>
        </div>
      </div>
    </div>
  )
}