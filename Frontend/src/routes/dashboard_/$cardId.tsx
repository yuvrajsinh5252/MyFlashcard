import { createFileRoute } from "@tanstack/react-router";
import getFlashcards from "@/hooks/getFlashcards";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, FlipHorizontal } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading";

const styles = {
  backfaceHidden: {
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    transformStyle: "preserve-3d",
  },
} as const;

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
    error,
  } = getFlashcards(cardId) as {
    flashcards: any[];
    isLoading: boolean;
    error?: Error;
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        setShowAnswer(!showAnswer);
      } else if (e.key === "ArrowLeft" && step > 0) {
        setStep(step - 1);
        setShowAnswer(false);
      } else if (e.key === "ArrowRight" && step < flashcards.length - 1) {
        setStep(step + 1);
        setShowAnswer(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [step, showAnswer, flashcards.length]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (!flashcards.length) return <div>No flashcards found</div>;

  return (
    <div
      className="flex flex-col justify-center items-center min-h-[calc(100vh-10rem)]
    p-2 sm:p-4 bg-gray-50 dark:bg-gray-900 mt-6 sm:mt-10 rounded-xl"
    >
      <div className="w-full max-w-3xl space-y-4 sm:space-y-6">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / flashcards.length) * 100}%` }}
          />
        </div>

        <div
          onClick={() => setShowAnswer(!showAnswer)}
          className="perspective-[1000px] cursor-pointer group relative w-full touch-manipulation"
          style={{ perspective: "1000px" }}
        >
          <div
            className={`relative transition-transform duration-700 transform-gpu
            min-h-[300px] sm:min-h-[400px] w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg
            hover:shadow-2xl border border-gray-200 dark:border-gray-700`}
            style={{
              transformStyle: "preserve-3d",
              transform: showAnswer ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Question side */}
            <div
              style={styles.backfaceHidden}
              className="absolute w-full h-full flex flex-col items-center justify-center p-4 sm:p-8"
            >
              <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-medium text-center">
                {flashcards[step].question}
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Tap to reveal answer
              </p>
            </div>
            {/* Answer side */}
            <div
              style={{
                ...styles.backfaceHidden,
                transform: "rotateY(180deg)",
              }}
              className="absolute w-full h-full flex flex-col items-center justify-center p-4 sm:p-8"
            >
              <h2 className="text-gray-900 dark:text-white text-xl sm:text-2xl md:text-3xl font-medium text-center">
                {flashcards[step].answer}
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                Tap to see question
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg
            bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30
            text-primary dark:text-primary-foreground font-medium text-sm sm:text-base
            disabled:opacity-50 disabled:cursor-not-allowed transition-all
            border border-primary/20 dark:border-primary/30"
            onClick={() => {
              setStep(step - 1);
              setShowAnswer(false);
            }}
            disabled={step === 0}
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            Previous
          </button>

          <div className="flex items-center gap-4">
            <button
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg
              hover:bg-gray-100 dark:hover:bg-gray-800
              text-gray-600 dark:text-gray-400 transition-all text-sm sm:text-base"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              <FlipHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
              Flip
            </button>

            <div className="text-sm sm:text-base font-medium">
              {step + 1} / {flashcards.length}
            </div>
          </div>

          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg
            bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90
            text-primary-foreground font-medium text-sm sm:text-base
            disabled:opacity-50 disabled:cursor-not-allowed transition-all
            border border-primary/20 dark:border-primary/30"
            onClick={() => {
              setStep(step + 1);
              setShowAnswer(false);
            }}
            disabled={step === flashcards.length - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Press space/enter to flip, arrow keys to navigate
        </div>
      </div>
    </div>
  );
}
