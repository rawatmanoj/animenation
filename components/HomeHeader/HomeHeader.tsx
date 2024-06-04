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
import parse from "html-react-parser";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { Button } from "../ui/button";

export type HomeHeaderProps = {
  result: ISearch<IAnimeResult> | undefined;
};
export default function HomeHeader({ result }: HomeHeaderProps) {
  return (
    <div className="mt-5 w-full mb-5 bg-shade-color">
      <Carousel
        // plugins={[
        //   Autoplay({
        //     delay: 4000,
        //   }),
        // ]}
        // opts={{
        //   align: "start",
        //   loop: true,
        // }}
        className="min-w-full max-w-xs "
      >
        <CarouselContent className="min-w-full ">
          {result?.results.map((info, index) => {
            if (index <= 10)
              return (
                <CarouselItem key={info?.id} className="basis-[100%] ">
                  <div
                    key={info.id}
                    className="w-full md:h-[500px] h-[250px] relative"
                    // style={{
                    //   background:
                    //     "linear-gradient(270deg,transparent 0,rgb(32,31,49) 30%,rgb(32,31,49) 70%,transparent)",
                    // }}
                  >
                    <div
                      style={{
                        background:
                          "radial-gradient(closest-side, transparent, transparent, #23252B)",
                      }}
                      className="w-3/4 relative h-full float-right"
                    >
                      <Image
                        className="rounded-md shadow-md opacity-25"
                        src={info?.cover || ""}
                        alt="Card Image"
                        loading="eager"
                        quality={50}
                        fill
                      />
                    </div>
                    <div className="pl-5 absolute top-14 h-max w-11/12 sm:w-7/12 ">
                      <div className="md:text-4xl text-2xl mb-5 font-bold">
                        {(info?.title as ReusableCardTypes["title"])
                          .userPreferred.length > 100
                          ? (
                              info?.title as ReusableCardTypes["title"]
                            ).userPreferred?.slice(0, 100) + "..."
                          : (info?.title as ReusableCardTypes["title"])
                              .userPreferred}
                      </div>
                      <div className="flex gap-4 font-semibold mb-2">
                        {(info?.averageScore || info?.rating) && (
                          <p className="text-sm flex justify-center items-center gap-1">
                            {info?.averageScore / 10 ||
                              (info?.rating && info?.rating / 10)}
                            <FaStar color="#FF4500" />
                          </p>
                        )}
                        <p className="text-sm">{info?.type}</p>
                        <span className="text-sm font-semibold">
                          {info?.releaseDate ||
                            info?.startDate?.day +
                              "/" +
                              info?.startDate?.month +
                              "/" +
                              info?.startDate?.year}
                        </span>
                      </div>
                      <div className="font-medium text-lg font-semibold">
                        {" "}
                        {info?.description.length > 500
                          ? parse(info?.description?.slice(0, 500)) + "..."
                          : parse(info?.description)}
                      </div>
                      <div className="flex justify-between items-center relative bottom-[-40px]">
                        <Link href={`/anime/${info?.id}`}>
                          <Button className="hover:bg-special">
                            See Details
                          </Button>
                        </Link>
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
