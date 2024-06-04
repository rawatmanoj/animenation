import CardGrid from "@/components/CardGrid/CardGrid";
import { ANIME, META } from "@consumet/extensions";
import React from "react";

export default async function PopularAnime() {
  const animeProvider = new META.Anilist(new ANIME.Gogoanime());

  const RELEASING = await animeProvider.advancedSearch(
    undefined,
    undefined,
    undefined,
    24,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    "RELEASING"
  );

  return <CardGrid result={RELEASING} heading="Releasing Anime" />;
}
