import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function AddCard(user: any) {
  const [items, setItems] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData();

    formData.append("userId", user.user.id);
    formData.append(
      "name",
      (form["name"] as unknown as HTMLInputElement).value
    );
    formData.append("items", items.toString());
    const questionArray = [];
    const answerArray = [];

    for (let i = 0; i < items; i++) {
      const question = (form[`question-${i}`] as HTMLInputElement).value;
      const answer = (form[`answer-${i}`] as HTMLInputElement).value;
      console.log(question, answer);
      questionArray.push(question);
      answerArray.push(answer);
    }

    formData.append("questions", JSON.stringify(questionArray));
    formData.append("answers", JSON.stringify(answerArray));

    const formDataObject = Object.fromEntries(formData);
    console.log(formDataObject);

    await fetch("https://myflashcard.onrender.com/createcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    });

    window.location.reload();
  };

  return (
    <div className="w-full max-h-[70vh] overflow-y-auto px-2">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Card Set Name
            </label>
            <Input type="text" id="name" placeholder="Enter card set name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="times" className="text-sm font-medium">
              Number of Cards (max 10)
            </label>
            <Input
              type="number"
              id="times"
              value={items}
              min="0"
              max="10"
              onChange={(e) =>
                setItems(Math.min(10, Math.max(0, Number(e.target.value))))
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: items }).map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/40 rounded-lg"
            >
              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  htmlFor={`question-${index}`}
                >
                  Question {index + 1}
                </label>
                <Input
                  type="text"
                  id={`question-${index}`}
                  placeholder="Enter question"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  htmlFor={`answer-${index}`}
                >
                  Answer {index + 1}
                </label>
                <Input
                  type="text"
                  id={`answer-${index}`}
                  placeholder="Enter answer"
                />
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" className="w-full">
          Create Flashcard Set
        </Button>
      </form>
    </div>
  );
}
