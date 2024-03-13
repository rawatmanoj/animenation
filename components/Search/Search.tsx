"use client";
import { META } from "@consumet/extensions";
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { DialogComp } from "../Dialog/Dialog";
import { Dialog } from "../ui/dialog";
// import { Dialog } from "../Dialog/Dialog";

export default function Search(props: any) {
  const route = useRouter();
  const searchDefault = useSearchParams().get("search");
  const [isDialogaOpen, setIsDialogOpen] = useState(false);

  function handleSearch(event: any) {
    event.preventDefault();
    let value = event?.target[0].value;
    //console.log(event?.target as Array<HTMLInputElement>, "evvenmt");
    route.push(`/search?search=${value}`);
  }

  const handleClick = () => {
    setIsDialogOpen(!isDialogaOpen);
  };

  return (
    <div className="flex items-center justify-around mr-5 flex-2 text-slate-300">
      <DialogComp />
      {/* <form onSubmit={handleSearch}>
        <input
          //   type="submit"
          defaultValue={searchDefault || ""}
          className="bg-base-color rounded pl-2 pt-1 pb-1 text-xl"
          width={400}
          height={80}
          name="search"
          placeholder="Search"
        />
      </form> */}
    </div>
  );
}
