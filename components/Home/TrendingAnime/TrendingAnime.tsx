import { HomeHeaderProps } from "@/components/HomeHeader/HomeHeader";
import Slider from "@/components/Slider/Slider";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import React from "react";

export default async function PopularAnime({ result }: HomeHeaderProps) {
  return <Slider result={result} heading="Trending Anime" />;
}
