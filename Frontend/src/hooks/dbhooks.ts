import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function useAuth() {
  const { user, isLoading } = useAuth0();

  async function createUser() {
    if (!user || isLoading) return;
    await fetch("https://myflashcard.onrender.com/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: user.id, name: user.given_name }),
    });
  }

  useEffect(() => {
    createUser();
  }, [isLoading]);

  return { isLoading };
}
