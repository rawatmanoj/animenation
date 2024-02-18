"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { IAnimeEpisode } from "@consumet/extensions";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useSearchParams } from "next/navigation";
import { Pause, PlayCircle } from "lucide-react";
import { Lato } from "next/font/google";
const lato = Lato({ weight: "400", subsets: ["latin"] });

export default function EpisodeList({
  epsiodes,
  handleEpisodeClick,
  handleTabClick,
  type,
}: {
  epsiodes: IAnimeEpisode[] | null;
  handleEpisodeClick: (id: string) => void;
  handleTabClick: (tab: string) => void;
  type: string;
}) {
  //   const searchParams = new URLSearchParams(req.nextUrl.searchParams);

  const params = useSearchParams();
  let currentEpisodeFroms = params.get("episode");
  if (type === "dubs")
    currentEpisodeFroms =
      currentEpisodeFroms?.replace("dub-episode", "episode") || null;

  const [currentEpisode, setCurrentEpisode] = useState(currentEpisodeFroms);

  console.log(currentEpisode, epsiodes, "epsiodesepsiodes");

  return (
    <div className={`w-full bg-base-color border-0`}>
      <ScrollArea className="h-[45rem] w-full rounded-md border-0 bg-shade-color text-bright">
        <div className="p-4">
          {epsiodes?.map((episode) => (
            <div key={episode.id}>
              <div
                onClick={() => {
                  handleEpisodeClick(episode.id);
                  // setCurrentEpisode(episode.id);
                }}
                style={{ fontWeight: "600" }}
                className={`${
                  currentEpisodeFroms === episode.id ? "text-special" : ""
                } text-sm flex justify-between hover:text-special cursor-pointer ${
                  lato.className
                } `}
              >
                {episode.title}
                {currentEpisodeFroms === episode.id ? (
                  <Pause />
                ) : (
                  <PlayCircle />
                )}
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
