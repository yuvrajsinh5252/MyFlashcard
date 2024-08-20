import { useState } from "react";
import { Input } from "./ui/input";

export default function AddCard(user: any) {
  const [items, setItems] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData();

    formData.append("userId", user.user.id);
    formData.append("name", (form["name"] as unknown as HTMLInputElement).value);
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

    console.log(Object.fromEntries(formData));
    const formDataObject = Object.fromEntries(formData);
    console.log(formDataObject);



    await fetch("https://backend-gi70.onrender.com/createcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject),
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4 items-center justify-center">
            <div className="w-80">
              <label htmlFor="name">Card name</label>
              <Input type="text" id="name" />
            </div>
            <div className="w-80">
              <label htmlFor="times">Items</label>
              <Input
                type="number"
                id="times"
                value={items}
                onChange={(e) => setItems(Number(e.target.value) < 11 ? Number(e.target.value) : 10)}
              />
            </div>
          </div>
          {Array.from({ length: items }).map((_, index) => (
            <div key={index} className="flex gap-2 justify-center items-center">
              <label className="w-32" htmlFor={`question-${index}`}>Que {index + 1}</label>
              <Input type="text" id={`question-${index}`} />
              <label className="w-32" htmlFor={`answer-${index}`}>Ans {index + 1}</label>
              <Input type="text" id={`answer-${index}`} />
            </div>
          ))}
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}