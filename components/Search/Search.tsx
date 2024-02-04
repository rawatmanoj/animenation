"use client";
import { META } from "@consumet/extensions";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const route = useRouter();
  function handleSearch(event: any) {
    event.preventDefault();
    let value = event?.target[0].value;
    //console.log(event?.target as Array<HTMLInputElement>, "evvenmt");
    route.push(`/search?search=${value}`);
  }
  return (
    <div className="flex items-center justify-around mr-5 flex-2 text-slate-300">
      <FaSearch className="mr-2 text-2xl " />
      <form onSubmit={handleSearch}>
        <input
          //   type="submit"
          className="bg-[#141f38] rounded pl-2 pt-1 pb-1 text-xl"
          width={400}
          height={80}
          name="search"
          placeholder="Search"
        />
      </form>
    </div>
  );
}
