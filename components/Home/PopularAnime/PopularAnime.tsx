import CardGrid from "@/components/CardGrid/CardGrid";
import Slider from "@/components/Slider/Slider";
import { ANIME, META } from "@consumet/extensions";
import React from "react";

export default async function PopularAnime() {
  const animeProvider = new META.Anilist(new ANIME.Gogoanime());

  const popularAnime = await animeProvider.fetchPopularAnime(1, 24);

  return <CardGrid result={popularAnime} heading="Popular Anime" />;
}
