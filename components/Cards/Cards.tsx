import Image from "next/image";
import Link from "next/link";
import React from "react";

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
};

const ReusableCard = ({ imageUrl, title, rating, id }: ReusableCardTypes) => {
  return (
    <div className="m-2 relative">
      <div style={{ aspectRatio: "2/3" }} className="relative">
        <div className="font-bold rounded-md m-1 p-1 h-1/8 bg-black opacity-70 absolute text-xs z-10">
          {rating && (rating / 10).toFixed(1)}
        </div>
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
      </div>
      <div className="pt-1 w-40">
        <div className="text-xs md:text-sm font-semibold mb-2 w-3/4 md:w-4/4">
          {title.userPreferred.length > 30
            ? title.userPreferred?.slice(0, 30) + "..."
            : title.userPreferred}
        </div>
      </div>
    </div>
  );
};

export default ReusableCard;
