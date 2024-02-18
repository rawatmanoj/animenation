"use client";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import Image from "next/image";
import React from "react";
import { ReusableCardTypes } from "../Cards/Cards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export type HomeHeaderProps = {
  result: ISearch<IAnimeResult> | undefined;
};
export default function HomeHeader({ result }: HomeHeaderProps) {
  return (
    <div className="mt-5 w-full mb-5">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="min-w-full max-w-xs "
      >
        <CarouselContent className="w-full ">
          {result?.results.map((info, index) => {
            if (index <= 10)
              return (
                <CarouselItem key={info?.id} className="basis-[100%] ">
                  <div
                    key={info.id}
                    className="w-full md:h-[500px] h-[250px] relative"
                  >
                    <Image
                      className="rounded-md shadow-md opacity-25"
                      src={info?.cover || ""}
                      alt="Card Image"
                      loading="eager"
                      quality={50}
                      fill
                    />
                    <div className="pl-5 absolute pb-5 h-full w-11/12 sm:w-7/12 flex flex-col  items-left justify-end ">
                      <div className="md:text-4xl text-xl mb-5">
                        {(info?.title as ReusableCardTypes["title"])
                          .userPreferred.length > 50
                          ? (
                              info?.title as ReusableCardTypes["title"]
                            ).userPreferred?.slice(0, 50) + "..."
                          : (info?.title as ReusableCardTypes["title"])
                              .userPreferred}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
