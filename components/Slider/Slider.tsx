import ReusableCard, { ReusableCardTypes } from "../Cards/Cards";
import { IAnimeResult, ISearch } from "@consumet/extensions";
// import Carousel from "react-multi-carousel";

export type SliderProps = {
  result: ISearch<IAnimeResult> | undefined;
  heading: string;
};
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HoverCard } from "../ui/hover-card";
import { HoverCardReusableContent } from "../HoverCard/HoverCard";

export default function Slider({ result, heading }: SliderProps) {
  return (
    <div className="mt-5 w-full ">
      <div className="text-md md:text-2xl  pl-2 font-bold">{heading}</div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="min-w-full  max-w-sm "
      >
        <CarouselContent className="w-full">
          {result?.results.map((info) => {
            return (
              <CarouselItem
                key={info?.id}
                className="basis-[40%] sm:basis-[30%] md:basis-[20%] lg:basis-[14%] "
              >
                <HoverCard openDelay={200} closeDelay={0}>
                  <ReusableCard
                    imageUrl={info.image}
                    title={info?.title as ReusableCardTypes["title"]}
                    rating={info?.rating}
                    id={info?.id}
                  />
                  <HoverCardReusableContent info={info} />
                </HoverCard>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
