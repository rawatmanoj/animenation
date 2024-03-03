"use client";
import React, { useOptimistic, useReducer, useTransition } from "react";
import ReusableCard, { ReusableCardTypes } from "../Cards/Cards";
import { genres, year } from "@/helpers/constants";
import FancyMultiSelect from "../ui/FancyMultiSelect";
import { SingleSelect } from "../ui/SingleSelect";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
interface GenreAction {
  type: string;
  payload: any;
}

type FilterState = {
  genres: Array<any>;
};

type ReducerType = (state: FilterState, action: GenreAction) => FilterState;

const kindOfReducer: ReducerType = (state, action) => {
  switch (action.type) {
    case "updateGenre": {
      return {
        ...state,
        genres: [...action.payload],
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default function SearchResult({
  paramGenres,
  paramYear,
  searchParams,
  result,
}: any) {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();
  const [isPendingTrans, startTransition] = useTransition();
  const params = new URLSearchParams(searchParams);
  const paramsGenres = params.get("genres")?.split(",") || [];
  // const [filterState, dispatch] = useReducer(reducer, initialArg);
  const initialArg = {
    genres: paramsGenres,
  };
  const [optimisticFilterState, setOptimisticFilterState] = useOptimistic(
    initialArg,
    kindOfReducer
  );

  function submitSearch(updateData: any, type: any) {
    let genres: string = "";
    let params = new URLSearchParams(searchParams);
    if (type === "genres") {
      params.set("genres", updateData.label);
      updateData.forEach((item: any, index: number) => {
        console.log(item, "item");
        if (updateData.length - 1 === index) genres = genres + item;
        else genres = genres + item + ",";
      });
      if (genres) {
        params.set("genres", genres.trim());
        console.log(params.get("genres"), genres, "apartams");
      } else {
        params.delete("genres");
      }
    }
    startTransition(() => {
      setOptimisticFilterState({
        type: "updateGenre",
        payload: updateData,
      });
      router.push(`/search?${params}`);
    });
  }
  console.log(optimisticFilterState, "optimisticFilterState");
  return (
    <div>
      <div className="md:flex gap-4 flex-wrap">
        <div>
          <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1 max-w-fit">
              <AccordionTrigger className="hover:no-underline font-bold">
                Geners
              </AccordionTrigger>
              <AccordionContent className="flex gap-2 flex-wrap ">
                {genres.map((gen) => {
                  if (!optimisticFilterState.genres.includes(gen.value)) {
                    return (
                      <Badge
                        onClick={() => {
                          let updateFilters = [
                            ...optimisticFilterState.genres,
                            gen.value,
                          ];

                          // dispatch({
                          //   type: filterState.genres.includes(gen)
                          //     ? "removeGenre"
                          //     : "addGenre",
                          //   payload: gen,
                          // });
                          submitSearch(updateFilters, "genres");
                        }}
                        className={`text-md cursor-pointer`}
                        key={gen.label}
                      >
                        {gen.label}
                      </Badge>
                    );
                  }
                  return (
                    <Badge
                      onClick={() => {
                        let updateFilters = optimisticFilterState.genres.filter(
                          (opt) => opt !== gen.value
                        );
                        // dispatch({
                        //   type: filterState.genres.includes(gen)
                        //     ? "removeGenre"
                        //     : "addGenre",
                        //   payload: gen,
                        // });
                        submitSearch(updateFilters, "genres");
                      }}
                      className={`text-md cursor-pointer text-red-500 `}
                      key={gen.label}
                    >
                      {gen.label}
                    </Badge>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="mt-2 grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {result?.results.map((info: any) => {
          return (
            <div
              key={info.id}
              className={
                isPendingTrans ? " duration-700 ease-linear animate-pulse" : " "
              }
            >
              <ReusableCard
                imageUrl={info.image}
                title={info?.title as ReusableCardTypes["title"]}
                rating={info?.rating}
                id={info?.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
