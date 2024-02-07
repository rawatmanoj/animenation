import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import React from "react";
import axios from "axios";

export default async function page() {
  const res = await axios.get(
    `https://march-api1.vercel.app/meta/anilist/watch/kimetsu-no-yaiba-episode-1?provider=gogoanime`
  );
  return (
    <div className="mt-10 min-h-screen flex flex-col justify-center items-center bg-red-200">
      <main className="w-full">
        <VideoPlayer
          resources={res?.data?.sources}
          referer={res?.data?.sources?.headers?.referer || ""}
          className="h-12 "
        />
      </main>
      {/* <div className="h-[20rem] w-full bg-red-100"></div> */}
    </div>
  );
}
