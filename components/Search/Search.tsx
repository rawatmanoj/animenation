import { META } from "@consumet/extensions";
import { redirect } from "next/navigation";
import React, { FormEvent } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  async function handleSearch(formData: FormData) {
    const search = formData.get("search") as string;
    redirect(`/search/${search}`);
  }
  return (
    <div className="flex items-center justify-around mr-5">
      <FaSearch className="mr-2" />
      <form action={handleSearch}>
        <input
          //   type="submit"
          className="bg-[#141f38] rounded pl-1"
          width={200}
          height={80}
          name="search"
        />
      </form>
    </div>
  );
}
