import ReusableCard, { ReusableCardTypes } from "@/components/Cards/Cards";
import { META } from "@consumet/extensions";
import React from "react";

export default async function Search({ params }: any) {
  const anilist = new META.Anilist();
  const id = params?.id;
  const result = await anilist.advancedSearch(id);
  console.log(result, ":");
  return (
    <div>
      <div className="flex flex-wrap ">
        {result?.results.map((info) => {
          return (
            <ReusableCard
              imageUrl={info.image}
              title={info?.title as ReusableCardTypes["title"]}
              key={info.id}
              rating={info?.rating}
              id={info?.id}
            />
          );
        })}
      </div>
    </div>
  );
}
