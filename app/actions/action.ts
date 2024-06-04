"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitSearch(selected: any, type: any,searchParams:any) {
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
      if(genres){
        params.set("genres", genres);
      }else {
        params.delete("genres")
      }
      
    } else {
      if (type === "year") {
        selected && params.set("year", selected);
      }
    }
    redirect(`/search/anime?${params}`);
  }