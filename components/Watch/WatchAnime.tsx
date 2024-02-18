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
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { StepBack, StepForward } from "lucide-react";

export default function WatchAnime({ id, sources }: any) {
  const router = useRouter();
  const params = useSearchParams();
  const paramType = params.get("type") || "subs";
  let episode = params.get("episode") || null;
  const [isPendingTrans, startTransition] = useTransition();
  const typeParams = params.get("type") || "subs";
  const [epsiodes, setEpisodes] = useState<IAnimeEpisode[] | null>(null);
  let currentEpArray = episode?.split("-");
  let currentEpisode =
    currentEpArray && Number(currentEpArray[currentEpArray?.length - 1]);
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

  const handleNextPreviousEpisode = (type: string) => {
    if (type === "prv") {
      currentEpArray &&
        currentEpisode &&
        (currentEpArray[currentEpArray?.length - 1] = String(
          currentEpisode - 1
        ));
    }
    if (type === "next") {
      currentEpArray &&
        currentEpisode &&
        (currentEpArray[currentEpArray?.length - 1] = String(
          currentEpisode + 1
        ));
    }
    startTransition(() => {
      router.push(
        `/anime/watch/${id}?type=${paramType}&&episode=${currentEpArray?.join(
          "-"
        )}`
      );
    });
  };

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

        <Card className="w-full mt-2 bg-shade-color border-0 flex items-center p-4 gap-2">
          <div>
            <Button
              variant="secondary"
              size="icon"
              // className="bg-red-200"
              disabled={currentEpisode === 1}
              onClick={() => {
                handleNextPreviousEpisode("prv");
                // if (ep === "1") return;
                // const newEp = (currentEp?.number || 2) - 1;
                // setEpId(
                //   (dub === "true" ? dubEps : subEps).find(
                //     (ep) => ep.number === newEp
                //   )?.id + ""
                // );
              }}
            >
              <StepBack />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="ml-2"
              // className="bg-red-200"
              // disabled={ep === "1"}
              onClick={() => {
                handleNextPreviousEpisode("next");
                // if (ep === "1") return;
                // const newEp = (currentEp?.number || 2) - 1;
                // setEpId(
                //   (dub === "true" ? dubEps : subEps).find(
                //     (ep) => ep.number === newEp
                //   )?.id + ""
                // );
              }}
            >
              <StepForward />
            </Button>
          </div>
          <div>
            <Tabs
              defaultValue={typeParams}
              className="w-full  flex justify-center items-center"
            >
              <TabsList className="  ">
                <TabsTrigger
                  className="data-[state=active]:bg-special data-[state=active]:text-white"
                  onClick={() => handleTabClick("subs")}
                  value="subs"
                >
                  Subs
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-special data-[state=active]:text-white"
                  onClick={() => handleTabClick("dubs")}
                  value="dubs"
                >
                  Dubs
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
}
