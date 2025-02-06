import { getcardGroups } from "@/hooks/getcards";
import CardGroup from "./Cardgroup";

export default function GetCards(user: any) {
  const { data, isLoading } = getcardGroups(user);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((card: any, count: any) => (
            <CardGroup
              key={count}
              name={card?.name}
              items={card?.items}
              id={card?.groupid}
            />
          ))}
        </div>
      )}
    </div>
  );
}
