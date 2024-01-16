import { ITitle } from "@consumet/extensions";
import Image from "next/image";
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
};

const ReusableCard = ({ imageUrl, title, rating }: ReusableCardTypes) => {
  return (
    <div className="m-2 relative">
      <div className="font-bold rounded-md m-1 p-1 h-1/8 bg-black opacity-70 absolute text-xs text-white">
        {rating && (rating / 10).toFixed(1)}
      </div>
      <Image
        className="rounded-md shadow-md "
        src={imageUrl || ""}
        alt="Card Image"
        width={185}
        height={264}
        loading="eager"
        quality={50}
      />
      <div className="pt-1">
        <div className="text-xs md:text-sm font-semibold mb-2 w-4/4 md:w-3/4">
          {title.english}
        </div>
      </div>
    </div>
  );
};

export default ReusableCard;
