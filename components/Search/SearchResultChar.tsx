"use client";
import React, { useOptimistic, useReducer, useTransition } from "react";
import ReusableCard, { ReusableCardTypes } from "../Cards/Cards";
import { genres, year, format } from "@/helpers/constants";
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
import { HoverCard } from "../ui/hover-card";
import { HoverCardReusableContent } from "../HoverCard/HoverCard";
interface GenreAction {
  type: string;
  payload: any;
}

type FilterState = {
  genres: Array<any>;
  format: Array<any>;
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
    case "updateformat": {
      return {
        ...state,
        format: [...action.payload],
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default function SearchResultChar({ searchParams, result }: any) {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();
  const [isPendingTrans, startTransition] = useTransition();
  const params = new URLSearchParams(searchParams);
  const paramsGenres = params.get("genres")?.split(",") || [];
  const paramsFormat = params.get("format")?.split(",") || [];
  // const [filterState, dispatch] = useReducer(reducer, initialArg);
  const initialArg = {
    genres: paramsGenres,
    format: paramsFormat,
  };
  const [optimisticFilterState, setOptimisticFilterState] = useOptimistic(
    initialArg,
    kindOfReducer
  );

  return (
    <div>
      <div className="mt-2 grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {result?.Page?.characters.map((info: any) => {
          return (
            <div
              key={info.id}
              className={
                isPendingTrans ? " duration-700 ease-linear animate-pulse" : " "
              }
            >
              <HoverCard openDelay={200} closeDelay={0} key={info?.id}>
                <ReusableCard
                  imageUrl={info.image?.large}
                  title={info?.name}
                  id={info?.id}
                />
              </HoverCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
