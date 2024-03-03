import ReusableCard, { ReusableCardTypes } from "@/components/Cards/Cards";
import SearchResult from "@/components/Search/SearchResult";
import FancyMultiSelect from "@/components/ui/FancyMultiSelect";
import { SingleSelect } from "@/components/ui/SingleSelect";
import {
  airingStatus,
  format,
  genres,
  season,
  year,
} from "@/helpers/constants";
import { META } from "@consumet/extensions";
import { redirect } from "next/navigation";
import React from "react";

export default async function Search(props: any) {
  const anilist = new META.Anilist();
  const searchParams = new URLSearchParams(props?.searchParams).toString();
  const id = props?.searchParams?.search;
  const paramYear = props?.searchParams?.year;
  const paramGenres = props?.searchParams?.genres?.split(",") || undefined;
  let result = await anilist.advancedSearch(
    id,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    paramGenres,
    undefined,
    paramYear
  );

  return (
    <div className="mt-20 w-4/4 sm:w-3/4 m-auto">
      <div className="text-2xl">
        Search result for <span className="text-special">{id}</span>
      </div>
      <SearchResult
        paramGenres={paramGenres}
        paramYear={paramYear}
        result={result}
        searchParams={searchParams}
      />
    </div>
  );
}
