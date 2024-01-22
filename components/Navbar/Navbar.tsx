"use client";
import React from "react";
import { IAnimeResult, ISearch } from "@consumet/extensions";
import Link from "next/link";
import Search from "../Search/Search";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
export type SliderProps = {
  trendingAnime: ISearch<IAnimeResult>;
};

export default function HeaderSlider() {
  return (
    <div className="fixed bg-base-color  w-full h-12 z-[100] flex justify-between items-center">
      <section className="flex w-5/12 justify-around items-center">
        <Link href={"/"}>
          <div>Home</div>
        </Link>
        <div>Movies</div>
        <div>Manga</div>
        <div>My List</div>
      </section>
      <section className="flex w-3/12  items-center ">
        <Search />
        <IoIosNotifications className="ml-2 mr-2" />
        <FaUser />
      </section>
    </div>
  );
}
