"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { ANIME, IAnimeEpisode, META } from "@consumet/extensions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { redirect, useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function EpisodeList({
  animeId,
  handleEpisodeClick,
  handleTabClick,
}: any) {
  //   const searchParams = new URLSearchParams(req.nextUrl.searchParams);

  const anilist = useMemo(() => {
    return new META.Anilist(new ANIME.Gogoanime());
  }, []);
  const params = useSearchParams();
  const type = params.get("type") || "subs";
  const [epsiodes, setEpisodes] = useState<IAnimeEpisode[] | null>(null);
  useEffect(() => {
    const getEpisodes = async () => {
      if (type === "subs") {
        const subEps = await axios
          .get("/api/anime/" + animeId + "/eps", {
            params: {
              provider: "",
              type: "subs",
            },
          })
          .catch(() => null);
        console.log(subEps, "subEpssubEps");
        setEpisodes(subEps?.data?.sub);
      } else {
        const dubEps = await axios
          .get("/api/anime/" + animeId + "/eps", {
            params: {
              provider: "",
              type: "dubs",
            },
          })
          .catch(() => null);
        setEpisodes(dubEps?.data?.dub);
      }
    };

    getEpisodes();
  }, [animeId, anilist, type]);

  console.log(epsiodes, "brrr");

  return (
    <Card className="w-full bg-shade-color">
      <Tabs
        defaultValue="account"
        className="w-full  flex justify-center items-center "
      >
        <TabsList className="">
          <TabsTrigger onClick={() => handleTabClick("subs")} value="account">
            Subs
          </TabsTrigger>
          <TabsTrigger onClick={() => handleTabClick("dubs")} value="password">
            Dubs
          </TabsTrigger>
        </TabsList>
        {/* <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
      </Tabs>

      <ScrollArea className="h-[45rem] w-full rounded-md border bg-shade-color text-bright">
        <div className="p-4">
          {epsiodes?.map((episode) => (
            <div key={episode.id}>
              <div
                onClick={() => handleEpisodeClick(episode.id)}
                className="text-sm"
              >
                {episode.title}
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
