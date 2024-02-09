"use client";
import React, { useTransition } from "react";
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

export default function WatchAnime({ id, sources }: any) {
  const router = useRouter();
  const params = useSearchParams();
  const paramType = params.get("type") || "subs";
  const episode = params.get("episode");
  const [isPendingTrans, startTransition] = useTransition();

  const handleTabClick = (type: string) => {
    router.push(`/anime/watch/${id}?type=${type}&&episode=${episode}`);
  };

  const handleEpisodeClick = async (epId: string) => {
    // router.push(`/anime/watch/${id}?type=${type}&&episode=${epId}`);
    startTransition(() => {
      router.push(`/anime/watch/${id}?type=${paramType}&&episode=${epId}`);
    });
  };
  console.log(isPendingTrans, "isPendingTrans");
  return (
    <div className="grid grid-cols-4 gap-1">
      <EpisodeList
        handleTabClick={handleTabClick}
        handleEpisodeClick={handleEpisodeClick}
        animeId={id}
      />
      <div className="w-[97%] mx-auto col-span-3">
        <VideoPlayer
          resources={sources}
          isPendingTrans={isPendingTrans}
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
