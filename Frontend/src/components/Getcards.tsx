import { getcardGroups } from "@/hooks/getcards";
import CardGroup from "./Cardgroup";

export default function GetCards(user: any) {
  const { data, isLoading } = getcardGroups(user);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {
            data?.map((card: any, count: any) => (
              <CardGroup key={count} name={card?.name} items={card?.items} id={card?.groupid} />
            ))
          }
        </div>
      )}
    </div>
  )
}