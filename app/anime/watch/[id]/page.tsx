import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import React, { Suspense } from "react";
import axios from "axios";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import EpisodeList from "@/components/Watch/EpisodeList";
import { useParams } from "next/navigation";
import { ANIME, ISource, META } from "@consumet/extensions";
import WatchAnime from "@/components/Watch/WatchAnime";
type AnimeProps = {
  params: { id: string };
  searchParams: any;
};
export default async function Watch({
  params: { id },
  searchParams,
}: AnimeProps) {
  // const params = useParams()
  const anilist = new META.Anilist(new ANIME.Gogoanime());
  const res: ISource | null = await anilist
    .fetchEpisodeSources(searchParams?.episode || "")
    .catch(() => null);

  // const res = await axios.get(
  //   `https://march-api1.vercel.app/meta/anilist/watch/kimetsu-no-yaiba-episode-1?provider=gogoanime`
  // );
  console.log(res, "resresres");

  console.log(searchParams?.type, "searchParams?.type");
  return (
    <div className="mt-10 ">
      <div className="h-fit mt-14">
        <WatchAnime sources={res?.sources} id={id} />
      </div>

      {/* <div className="h-[20rem] w-full bg-red-100"></div> */}
    </div>
  );
}
