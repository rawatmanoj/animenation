import ReusableCard, { ReusableCardTypes } from "@/components/Cards/Cards";
import PopularAnime from "@/components/Home/PopularAnime/PopularAnime";
import ReleasingAnime from "@/components/Home/ReleasingAnime/ReleasingAnime";
import TrendingAnime from "@/components/Home/TrendingAnime/TrendingAnime";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
  return (
    <main className="flex flex-col  text-white min-h-screen pt-10">
      <Suspense fallback={<Loading />}>
        <PopularAnime />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <TrendingAnime />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ReleasingAnime />
      </Suspense>
    </main>
  );
}
