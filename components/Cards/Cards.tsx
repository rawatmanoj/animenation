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
};

const ReusableCard = ({ imageUrl, title }: ReusableCardTypes) => {
  return (
    <div className="m-2">
      <Image
        className="rounded-md shadow-md "
        src={imageUrl || ""}
        alt="Card Image"
        width={185}
        height={264}
      />
      <div className="pt-1">
        <div className="text-sm font-semibold mb-2 w-3/4">{title.english}</div>
      </div>
    </div>
  );
};

export default ReusableCard;
