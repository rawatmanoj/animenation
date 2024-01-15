import Slider from "@/components/Slider/Slider";
import { META } from "@consumet/extensions";
import React from "react";

export default async function PopularAnime() {
  const animeProvider = new META.Anilist();

  const RELEASING = await animeProvider.advancedSearch(
    undefined,
    undefined,
    undefined,
    10,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "RELEASING"
  );

  return <Slider result={RELEASING} heading="Releasing Anime" />;
}
