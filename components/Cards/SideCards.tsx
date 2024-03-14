import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

export type ReusableCardTypes = {
  imageUrl: string | undefined;
  title: {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
  };
  rating: number | undefined;
  id: string;
  index: number;
  duration: number;
};

const SideReusableCard = ({
  imageUrl,
  title,
  rating,
  id,
  index,
  duration,
}: ReusableCardTypes) => {
  return (
    <div className=" flex items-center ">
      <div
        className={`${
          index < 3 && "border-b-[3px]"
        } text-slate-300 text-2xl border-special `}
      >
        <span>
          {index < 9 && 0}
          {index + 1}
        </span>
      </div>
      <div
        style={{ aspectRatio: "4/5", width: "80px" }}
        className="relative mr-2 ml-4"
      >
        <Link prefetch={false} href={`/anime/${id}`}>
          <Image
            className="rounded-md shadow-md "
            src={imageUrl || ""}
            alt="Card Image"
            // width={185}
            loading="eager"
            quality={50}
            fill={true}
            objectFit="cover"

            // style={{ minHeight: "264px" }}
          />
        </Link>
        d
      </div>
      <div className="pt-1 w-full">
        <div className="text-xs md:text-sm font-semibold mb-2 w-3/4 md:w-4/4 text-slate-300">
          {title.userPreferred.length > 30
            ? title.userPreferred?.slice(0, 30) + "..."
            : title.userPreferred}
        </div>
        <div className=" flex justify-start gap-2">
          <Badge> {rating && (rating / 10).toFixed(1)}</Badge>
          <Badge> {duration}m</Badge>
        </div>
      </div>
    </div>
  );
};

export default SideReusableCard;
