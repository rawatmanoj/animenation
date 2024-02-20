"use client";
import React, { useTransition } from "react";
import ReusableCard, { ReusableCardTypes } from "../Cards/Cards";
import { genres, year } from "@/helpers/constants";
import FancyMultiSelect from "../ui/FancyMultiSelect";
import { SingleSelect } from "../ui/SingleSelect";
import Loading from "../loading";
import { useRouter } from "next/navigation";

export default function SearchResult({
  paramGenres,
  paramYear,
  searchParams,
  result,
}: any) {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();
  const [isPendingTrans, startTransition] = useTransition();
  function submitSearch(selected: any, type: any, searchParams: any) {
    let genres: string = "";
    let params = new URLSearchParams(searchParams);
    if (Array.isArray(selected)) {
      if (selected.length > 0) {
        if (type === "genres") {
          selected.forEach((item, index) => {
            if (selected.length - 1 === index) genres = genres + item.value;
            else genres = genres + item.value + ",";
          });
        }
      }
      if (genres) {
        params.set("genres", genres);
      } else {
        params.delete("genres");
      }
    } else {
      if (type === "year") {
        selected ? params.set("year", selected) : params.delete("year");
      }
    }
    startTransition(() => {
      router.push(`/search?${params}`);
    });
  }
  return (
    <div>
      <div className="">
        <div>
          <div>Genres</div>
          <FancyMultiSelect
            submitSearch={submitSearch}
            type="genres"
            lists={genres}
            searchParams={searchParams}
            setIsPending={setIsPending}
            paramGenres={genres.filter((gen) =>
              paramGenres?.includes(gen.value)
            )}
          />
        </div>
        <div>
          <div>Year</div>
          <SingleSelect
            submitSearch={submitSearch}
            paramYear={paramYear}
            type="year"
            lists={year}
            searchParams={searchParams}
            setIsPending={setIsPending}
          />
        </div>
        {/* <div>
          <div>Season</div>
          <FancyMultiSelect submitSearch={submitSearch} lists={season} />
        </div>
        <div>
          <div>Format</div>
          <FancyMultiSelect submitSearch={submitSearch} lists={format} />
        </div>
        <div>
          <div>Airing Status</div>
          <FancyMultiSelect submitSearch={submitSearch} lists={airingStatus} />
        </div> */}
      </div>
      <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {!isPendingTrans ? (
          result?.results.map((info: any) => {
            return (
              <div key={info.id} className="w-">
                <ReusableCard
                  imageUrl={info.image}
                  title={info?.title as ReusableCardTypes["title"]}
                  rating={info?.rating}
                  id={info?.id}
                />
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
