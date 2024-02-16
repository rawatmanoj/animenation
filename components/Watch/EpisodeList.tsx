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
import { Pause, PlayCircle } from "lucide-react";
import { Lato } from "next/font/google";
const lato = Lato({ weight: "400", subsets: ["latin"] });

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
  const currentEpisode = params.get("episode");
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
    <Card className={`w-full bg-base-color border-0`}>
      <Tabs
        defaultValue="subs"
        className="w-full  flex justify-center items-center "
      >
        <TabsList className="bg-shade-color text-bright ">
          <TabsTrigger
            className="data-[state=active]:bg-special"
            onClick={() => handleTabClick("subs")}
            value="subs"
          >
            Subs
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-special"
            onClick={() => handleTabClick("dubs")}
            value="dubs"
          >
            Dubs
          </TabsTrigger>
        </TabsList>
        {/* <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
      </Tabs>

      <ScrollArea className="h-[45rem] w-full rounded-md border-0 bg-shade-color text-bright mt-2">
        <div className="p-4">
          {epsiodes?.map((episode) => (
            <div key={episode.id}>
              <div
                onClick={() => handleEpisodeClick(episode.id)}
                style={{ fontWeight: "600" }}
                className={`${
                  currentEpisode === episode.id ? "text-special" : ""
                } text-sm flex justify-between hover:text-special cursor-pointer ${
                  lato.className
                } `}
              >
                {episode.title}
                {currentEpisode === episode.id ? <Pause /> : <PlayCircle />}
              </div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
