/* eslint-disable react/display-name */
"use client";
import { Button } from "@/components/ui/button";
import React, {
  createRef,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import { IAnimeResult, IMangaResult, META } from "@consumet/extensions";
import { getQuery } from "@/helpers/AxiosInterceptor";
import Image from "next/image";
import Link from "next/link";

type ExtrasFields = {
  id: number;
  bannerImage?: string;
  coverImage?: { medium: string };
  name?: { userPreferred: string } | string;
  avatar?: { medium?: string };
  image?: { medium: string };
  title?: { userPreferred?: string };
};

type DataType = {
  anime: (IAnimeResult & ExtrasFields)[];
  characters: ExtrasFields[];
  manga: (IMangaResult & ExtrasFields)[];
  staff: ExtrasFields[];
  studios: ExtrasFields[];
  users: ExtrasFields[];
};

export function DialogComp() {
  console.log("Dialog");
  const anilist = new META.Anilist();
  const [searchValue, setSearchValue] = useState("");

  const [searchData, setSearchData] = useState<DataType>({
    anime: [],
    characters: [],
    manga: [],
    staff: [],
    studios: [],
    users: [],
  });

  const handleSubmit = async (id: string) => {
    let result = await getQuery(id);
    console.log(result, "result");
    setSearchData({
      anime: result?.anime?.results,
      characters: result?.characters?.results,
      manga: result?.manga?.results,
      staff: result?.staff?.results,
      studios: result?.studios?.results,
      users: result?.users?.results,
    });
  };
  console.log(Object.entries(searchData), "yesss");
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <FaSearch className="mr-2 text-2xl hover:text-white cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[756px] bg-shade-color px-0 pt-0  fixed">
          <div className="border-b pb-1 pt-1">
            <DialogHeader>
              <DialogDescription>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit((e?.target as any)[0].value);
                  }}
                >
                  <Input
                    className="bg-transparent border-0 focus-visible:ring-offset-0 focus-visible:ring-0 text-slate-300 font-bold"
                    placeholder="Search"
                    name="search"
                    autoComplete="off"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </form>
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="pl-2">
            {Object.entries(searchData).map((data, index) => {
              console.log(data, "datadatadata");
              return (
                <div key={index} className="grid mb-2">
                  {data[1]?.length > 0 && (
                    <>
                      <div className="flex justify-between text-slate-300 font-bold pr-2">
                        <div className="text-sm">{data[0].toUpperCase()}</div>
                        <Link
                          href={`/search?search=${searchValue}`}
                          className="text-xs hover:text-special cursor-pointer"
                        >
                          View all {data[0]} results
                        </Link>
                      </div>

                      {data[1]?.map((anime: any) => {
                        console.log(anime, "animeanime");
                        return (
                          <Link
                            className="flex h-[40px] mb-1 cursor-pointer hover:bg-[#393c46]"
                            key={anime?.id}
                            href={`/anime/${anime?.id}`}
                          >
                            <div
                              style={{
                                minHeight: "40px",
                                minWidth: "40px",
                                maxWidth: "40px",
                                maxHeight: "40px",
                              }}
                              className="relative"
                            >
                              <Image
                                fill={true}
                                objectFit="cover"
                                src={
                                  anime?.coverImage?.medium ||
                                  anime?.image?.medium ||
                                  anime?.avatar?.medium
                                }
                                alt="image"
                              />
                            </div>
                            <div className=" p-0 flex flex-col ml-2">
                              <div className="text-sm">
                                {anime?.title?.userPreferred ||
                                  anime?.name?.userPreferred ||
                                  anime?.name}
                              </div>
                              <div className="text-sm">
                                {anime?.startDate?.year}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
