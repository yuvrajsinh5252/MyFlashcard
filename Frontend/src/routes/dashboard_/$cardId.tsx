import { createFileRoute } from "@tanstack/react-router";
import getFlashcards from "@/hooks/getFlashcards";
import { useState } from "react";

export const Route = createFileRoute("/dashboard_/$cardId")({
  component: Flashcard,
});

function Flashcard() {
  const { cardId } = Route.useParams();
  const [step, setStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const {
    flashcards = [],
    isLoading,
  }: { flashcards: any[]; isLoading: boolean } = getFlashcards(cardId) as {
    flashcards: any[];
    isLoading: boolean;
  };
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] p-4">
      <div className="w-full max-w-3xl">
        <div
          onClick={() => setShowAnswer(!showAnswer)}
          className="perspective-1000 cursor-pointer"
        >
          <div
            className={`relative transition-all duration-500 transform-gpu ${showAnswer ? "rotate-y-180" : ""}
            min-h-[400px] w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl`}
          >
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <h2 className="text-white text-2xl md:text-3xl font-medium text-center">
                {showAnswer
                  ? flashcards[step].answer
                  : flashcards[step].question}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            className="px-6 py-3 rounded-lg bg-primary/90 hover:bg-primary text-white font-medium
              disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() => {
              setStep(step - 1);
              setShowAnswer(false);
            }}
            disabled={step === 0}
          >
            Previous
          </button>
          <div className="text-lg font-semibold">
            {step + 1} / {flashcards.length}
          </div>
          <button
            className="px-6 py-3 rounded-lg bg-primary/90 hover:bg-primary text-white font-medium
              disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            onClick={() => {
              setStep(step + 1);
              setShowAnswer(false);
            }}
            disabled={step === flashcards.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
