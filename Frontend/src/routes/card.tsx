
import Flashcard from "@/components/Flashcard";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export default function Card() {
  const { user, isLoading } = useKindeAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <Flashcard />
  );
}