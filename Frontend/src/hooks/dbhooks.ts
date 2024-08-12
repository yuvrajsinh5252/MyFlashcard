import { useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export function useAuth() {
  const { user, isLoading } = useKindeAuth();

  async function createUser() {
    if (!user || isLoading) return;
    await fetch("https://backend-gi70.onrender.com/createuser", {
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
