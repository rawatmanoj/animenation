"use client";
import React from "react";
import { IAnimeResult, ISearch } from "@consumet/extensions";
export type SliderProps = {
  trendingAnime: ISearch<IAnimeResult>;
};

export default function HeaderSlider() {
  return (
    <div className="text-white fixed bg-base-color  w-full h-12 z-[100] flex justify-between items-center">
      <section className="flex w-5/12 justify-around">
        <div>Home</div>
        <div>TV Shows</div>
        <div>Movies</div>
        <div>Manga</div>
        <div>Books</div>
        <div>My List</div>
      </section>
      <section className="flex w-3/12 justify-around">
        <div>Search</div>
        <div>Notify</div>
        <div>Profile</div>
      </section>
    </div>
  );
}
