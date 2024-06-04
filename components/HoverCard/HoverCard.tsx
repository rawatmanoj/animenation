"use client";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ANIME, IAnimeResult, META } from "@consumet/extensions";
import { ReusableCardTypes } from "../Cards/Cards";
import { FaRegStar, FaStar } from "react-icons/fa";
import Link from "next/link";

type HoverCardReusableContentTypes = {
  info: IAnimeResult | undefined;
};

export async function HoverCardReusableContent({
  info,
}: HoverCardReusableContentTypes) {
  let animeInfo = info;
  return (
    <HoverCardContent
      side="left"
      className="w-80 z-[5000000]"
      avoidCollisions={true}
      align="center"
      // sideOffset={100}
      alignOffset={100}
      id={info?.id}
    >
      <div className="flex justify-between space-x-4">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">
            {(animeInfo?.title as ReusableCardTypes["title"])?.userPreferred}
          </h4>
          <div>
            <div className="flex gap-2 font-semibold">
              {(animeInfo?.averageScore || animeInfo?.rating) && (
                <p className="text-sm flex justify-center items-center gap-1">
                  {animeInfo?.averageScore / 10 ||
                    (animeInfo?.rating && animeInfo?.rating / 10)}
                  <FaStar color="#FF4500" />
                </p>
              )}
              <p className="text-sm">{animeInfo?.type}</p>
            </div>
            <div className="flex flex-col pt-2 w-full ">
              <div className="text-slate-500 text-xs font-semibold">
                {animeInfo?.description && animeInfo?.description.length > 200
                  ? (animeInfo?.description).slice(0, 200) + "..."
                  : animeInfo?.description}
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <span className="text-xs text-muted-foreground font-semibold">
                Aired:{" "}
                {animeInfo?.releaseDate ||
                  animeInfo?.startDate?.day +
                    "/" +
                    animeInfo?.startDate?.month +
                    "/" +
                    animeInfo?.startDate?.year}
              </span>
              <span className="text-xs text-muted-foreground font-semibold">
                Status: {animeInfo?.status}
              </span>
              <span className="text-xs text-muted-foreground font-semibold">
                Native:{" "}
                {(animeInfo?.title as ReusableCardTypes["title"])?.native}
              </span>
              <span className="text-xs text-muted-foreground font-semibold">
                Genres: {animeInfo?.genres && animeInfo?.genres.join(", ")}
              </span>
            </div>
            {/* <div className="mt-2">
              <Link
                href={`/anime/watch/${info?.id}?episode=${
                  (animeInfo &&
                    animeInfo?.episodes &&
                    animeInfo?.episodes[0]?.id) ||
                  ""
                }`}
              >
                <Button className="bg-special">Watch now</Button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </HoverCardContent>
  );
}
