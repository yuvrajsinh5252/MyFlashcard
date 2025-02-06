import { useEffect, useState } from "react";

export function getcardGroups(user: any) {
  const [card, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getcardGroups() {
    const res = await fetch(
      `http://localhost:3000/fetchcardgroup/${user.user.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      setCard(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch data");
    }
  }

  useEffect(() => {
    getcardGroups();
  }, []);

  return { data: card, isLoading };
}
