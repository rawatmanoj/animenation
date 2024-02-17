"use client";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import EpisodeList from "./EpisodeList";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { ANIME, IAnimeEpisode, META } from "@consumet/extensions";
import axios from "axios";

export default function WatchAnime({ id, sources }: any) {
  const router = useRouter();
  const params = useSearchParams();
  const paramType = params.get("type") || "subs";
  let episode = params.get("episode") || null;
  const [isPendingTrans, startTransition] = useTransition();
  const typeParams = params.get("type") || "subs";
  const [epsiodes, setEpisodes] = useState<IAnimeEpisode[] | null>(null);

  const handleTabClick = (type: string) => {
    if (type === "dubs" && paramType === "subs") {
      episode = episode?.replace("episode", "dub-episode") || null;
      startTransition(() => {
        router.push(`/anime/watch/${id}?type=${type}&&episode=${episode}`);
      });
      return;
    }
    episode = episode?.replace("dub-episode", "episode") || null;
    startTransition(() => {
      router.push(`/anime/watch/${id}?type=${type}&&episode=${episode}`);
    });
  };

  // console.log(
  //   epsiodes,
  //   typeParams,
  //   episode,
  //   epsiodes?.find((el) => el.id === episode)
  // );

  const handleEpisodeClick = async (epId: string) => {
    // router.push(`/anime/watch/${id}?type=${type}&&episode=${epId}`);
    // if(type==="subs")
    if (paramType === "dubs") {
      const episode = epId?.replace("episode", "dub-episode") || null;
      console.log(paramType, "paramType", episode);
      startTransition(() => {
        router.push(`/anime/watch/${id}?type=${paramType}&&episode=${episode}`);
      });
      return;
    }
    startTransition(() => {
      router.push(`/anime/watch/${id}?type=${paramType}&&episode=${epId}`);
    });
  };
  const anilist = useMemo(() => {
    return new META.Anilist(new ANIME.Gogoanime());
  }, []);
  useEffect(() => {
    const getEpisodes = async () => {
      const subEps = await axios
        .get("/api/anime/" + id + "/eps", {
          params: {
            provider: "",
            type: "subs",
          },
        })
        .catch(() => null);
      setEpisodes(subEps?.data?.sub);
    };
    getEpisodes();
  }, [id, anilist]);
  return (
    <div className="grid grid-cols-4 gap-1">
      <EpisodeList
        handleTabClick={handleTabClick}
        handleEpisodeClick={handleEpisodeClick}
        epsiodes={epsiodes}
        type={typeParams}
      />
      <div className="w-[97%] mx-auto col-span-3">
        <VideoPlayer
          resources={sources}
          isPendingTrans={isPendingTrans}
          epsiodes={epsiodes}
          epId={episode}
          type={typeParams}
          // referer={res?.sources?.headers?.referer || ""}
          className="h-12 "
        />

        <Card className="w-full mt-10">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          <CardHeader>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            CardHeader
          </CardHeader>
          <CardContent>
            <CardTitle className="text-center">title</CardTitle>
            <CardDescription className="mt-2">CardDescription</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
