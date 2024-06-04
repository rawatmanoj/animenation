import ReusableCard, { ReusableCardTypes } from "@/components/Cards/Cards";
import SearchResult from "@/components/Search/SearchResult";
import SearchResultChar from "@/components/Search/SearchResultChar";
import FancyMultiSelect from "@/components/ui/FancyMultiSelect";
import { SingleSelect } from "@/components/ui/SingleSelect";
import { getCharacters } from "@/helpers/AxiosInterceptor";
import {
  airingStatus,
  format,
  genres,
  season,
  year,
} from "@/helpers/constants";
import { ANIME, META } from "@consumet/extensions";
import { redirect } from "next/navigation";
import React from "react";

export default async function Search(props: any) {
  console.log(props, "propsprops");
  const anilist = new META.Anilist(new ANIME.Gogoanime());
  const searchParams = new URLSearchParams(props?.searchParams).toString();
  const id = props?.searchParams?.search;
  let result = await getCharacters(id);

  console.log(JSON.stringify(result), "result");

  return (
    <div className="mt-20 w-4/4 sm:w-3/4 m-auto">
      <div className="text-2xl">
        Search result for <span className="text-special">{id}</span>
      </div>
      <SearchResultChar result={result} searchParams={searchParams} />
    </div>
  );
}
