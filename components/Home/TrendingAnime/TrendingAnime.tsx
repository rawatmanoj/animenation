import { HomeHeaderProps } from "@/components/HomeHeader/HomeHeader";
import Slider from "@/components/Slider/Slider";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import React from "react";

export default async function PopularAnime({ result }: HomeHeaderProps) {
  const delay = (func: any): Promise<ISearch<IAnimeResult> | undefined> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(func);
      }, 5000);
    });
  };

  return <Slider result={result} heading="Trending Anime" />;
}
