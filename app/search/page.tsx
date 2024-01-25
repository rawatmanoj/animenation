import ReusableCard, { ReusableCardTypes } from "@/components/Cards/Cards";
import { META } from "@consumet/extensions";
import React from "react";

export default async function Search({ searchParams }: any) {
  const anilist = new META.Anilist();
  console.log(searchParams);
  const id = searchParams?.search;
  const result = await anilist.advancedSearch(id);
  return (
    <div className="mt-20 w-4/4 sm:w-3/4 m-auto">
      <div className="flex flex-wrap">
        {result?.results.map((info) => {
          return (
            <div key={info.id} className="w-">
              <ReusableCard
                imageUrl={info.image}
                title={info?.title as ReusableCardTypes["title"]}
                rating={info?.rating}
                id={info?.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
