"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import SideReusableCard from "../Cards/SideCards";
import { HoverCard } from "../ui/hover-card";
import { ReusableCardTypes } from "../Cards/Cards";
import { HoverCardReusableContent } from "../HoverCard/HoverCard";
import { Card } from "../ui/card";
import { getSeasonalAnime } from "@/helpers/AxiosInterceptor";

export default function HomeSidebar({ trendingToday }: any) {
  const [trendingAnime, setTrendingAnime] = useState(trendingToday);

  const handleTabClick = async (season: string) => {
    const trendingAnime = await getSeasonalAnime(season);
    setTrendingAnime(trendingAnime);
  };

  //   useEffect(() => {
  //     const getSeasonAnime = async () => {
  //       const trendingAnime = await getSeasonalAnime();
  //       setTrendingAnime(trendingAnime);
  //     };

  //     getSeasonAnime();
  //   }, []);

  return (
    <div className="mt-5 col-span-2 flex items-center flex-col">
      <div className="pt-4 pb-4 flex justify-between w-4/5">
        <div className="text-xl font-bold text-special">Top 10</div>
        <div className="flex gap-2">
          {/* <div className="text-sm font-bold text-special">Winterd</div>
            <div className="text-sm font-bold text-special">Fall</div>
            <div className="text-sm font-bold text-special">Summer</div> */}
          <Tabs
            defaultValue={"WINTER"}
            className="w-full  flex justify-center items-center "
          >
            <TabsList className="bg-shade-color">
              <TabsTrigger
                className=" data-[state=active]:bg-special data-[state=active]:text-white"
                onClick={() => handleTabClick("WINTER")}
                value="WINTER"
              >
                Winter
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-special data-[state=active]:text-white"
                onClick={() => handleTabClick("FALL")}
                value="FALL"
              >
                Fall
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-special data-[state=active]:text-white"
                onClick={() => handleTabClick("SUMMER")}
                value="SUMMER"
              >
                Summer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <Card className="bg-shade-color border-0 w-4/5 p-2">
        {/* <CardHeader>Top 10</CardHeader> */}
        {trendingAnime?.Page?.media?.map((info: any, index: number) => {
          return (
            <div
              key={info?.id}
              className="text-white pt-4 pb-4 m-2 border-b-[1px] border-[#505562]"
              // className="basis-[40%] sm:basis-[30%] md:basis-[20%] lg:basis-[12%] "
            >
              <HoverCard openDelay={300} closeDelay={0}>
                <SideReusableCard
                  imageUrl={info.image || info?.coverImage?.large}
                  title={info?.title as ReusableCardTypes["title"]}
                  rating={info?.rating || info?.averageScore}
                  id={info?.id}
                  index={index}
                  duration={info?.duration}
                />
                <HoverCardReusableContent info={info} />
              </HoverCard>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
