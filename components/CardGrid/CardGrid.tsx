import { IAnimeResult, ISearch } from "@consumet/extensions";
import React from "react";
import { HoverCard } from "../ui/hover-card";
import { HoverCardReusableContent } from "../HoverCard/HoverCard";
import { CarouselItem } from "../ui/carousel";
import ReusableCard, { ReusableCardTypes } from "../Cards/Cards";
export type SliderProps = {
  result: ISearch<IAnimeResult> | undefined;
  heading: string;
};
function CardGrid({ result, heading }: SliderProps) {
  return (
    <div className="mt-5 w-full">
      <div className="text-md md:text-2xl  pl-2 font-bold">{heading}</div>
      <div className="mt-2 grid 2xl:grid-cols-6 xl:grid-cols-4  md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {result?.results.map((info) => {
          return (
            <HoverCard openDelay={200} closeDelay={0} key={info?.id}>
              <HoverCardReusableContent info={info} />
              <ReusableCard
                imageUrl={info.image}
                title={info?.title as ReusableCardTypes["title"]}
                rating={info?.rating}
                id={info?.id}
              />
            </HoverCard>
          );
        })}
      </div>
    </div>
  );
}

export default CardGrid;
