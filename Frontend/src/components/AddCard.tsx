import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddCard(user: any) {
  const [items, setItems] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const name = formData.get("name") as string;

    if (!name?.trim()) {
      newErrors.name = "Card set name is required";
    }

    for (let i = 0; i < items; i++) {
      const question = formData.get(`question-${i}`) as string;
      const answer = formData.get(`answer-${i}`) as string;

      if (!question?.trim()) {
        newErrors[`question-${i}`] = "Question is required";
      }
      if (!answer?.trim()) {
        newErrors[`answer-${i}`] = "Answer is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (!validateForm(formData)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      formData.append("userId", user.user.id);
      formData.append("items", items.toString());
      const questionArray = [];
      const answerArray = [];

      for (let i = 0; i < items; i++) {
        const question = (form[`question-${i}`] as HTMLInputElement).value;
        const answer = (form[`answer-${i}`] as HTMLInputElement).value;
        questionArray.push(question);
        answerArray.push(answer);
      }

      formData.append("questions", JSON.stringify(questionArray));
      formData.append("answers", JSON.stringify(answerArray));

      const formDataObject = Object.fromEntries(formData);

      await fetch("http://localhost:3000/createcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      toast({
        title: "Success",
        description: "Flashcard set created successfully",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to create flashcard set: ${error}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-h-[70vh] overflow-y-auto px-2">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Card Set Name <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              id="name"
              name="name" // Added name attribute
              placeholder="Enter card set name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="times" className="text-sm font-medium">
              Number of Cards (max 10)
            </label>
            <Input
              type="number"
              id="times"
              name="times" // Added name attribute
              value={items}
              min="0"
              max="10"
              onChange={(e) =>
                setItems(Math.min(10, Math.max(0, Number(e.target.value))))
              }
            />
          </div>
        </div>

        {items > 0 && (
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground mb-4">
              Progress: {items} cards to fill
            </div>
            <div className="space-y-4">
              {Array.from({ length: items }).map((_, index) => (
                <div key={index} className="relative group">
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
                      name={`question-${index}`} // Added name attribute
                      placeholder="Enter question"
                      className={
                        errors[`question-${index}`] ? "border-destructive" : ""
                      }
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
                      name={`answer-${index}`} // Added name attribute
                      placeholder="Enter answer"
                      className={
                        errors[`answer-${index}`] ? "border-destructive" : ""
                      }
                    />
                  </div>
                  {(errors[`question-${index}`] ||
                    errors[`answer-${index}`]) && (
                    <p className="text-xs text-destructive mt-1">
                      Please fill in both fields
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting || items === 0}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Flashcard Set"
          )}
        </Button>
      </form>
    </div>
  );
}
