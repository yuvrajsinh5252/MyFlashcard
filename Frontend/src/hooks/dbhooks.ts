import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SERVER_URL } from "@/lib/utils";

export function useAuth() {
  const { user, isLoading } = useAuth0();

  async function createUser() {
    if (!user || isLoading) return;
    await fetch(`${SERVER_URL}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user?.sub?.split("|")[1],
        name: user.given_name,
      }),
    });
  }

  useEffect(() => {
    createUser();
  }, [isLoading]);

  return { isLoading };
}
