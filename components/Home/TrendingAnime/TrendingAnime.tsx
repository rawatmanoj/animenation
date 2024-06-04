import CardGrid from "@/components/CardGrid/CardGrid";
import { HomeHeaderProps } from "@/components/HomeHeader/HomeHeader";
import React from "react";

export default async function PopularAnime({ result }: HomeHeaderProps) {
  return <CardGrid result={result} heading="Trending Anime" />;
}
