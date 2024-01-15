import Slider from "@/components/Slider/Slider";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import React from "react";

export default async function PopularAnime() {
  const delay = (func: any): Promise<ISearch<IAnimeResult> | undefined> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(func);
      }, 5000);
    });
  };
  const animeProvider = new META.Anilist();
  const trendingAnime = await delay(animeProvider.fetchTrendingAnime());

  return <Slider result={trendingAnime} heading="Trending Anime" />;
}
