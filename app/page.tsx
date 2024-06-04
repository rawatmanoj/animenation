import ReusableCard, { ReusableCardTypes } from "@/components/Cards/Cards";
import PopularAnime from "@/components/Home/PopularAnime/PopularAnime";
import ReleasingAnime from "@/components/Home/ReleasingAnime/ReleasingAnime";
import TrendingAnime from "@/components/Home/TrendingAnime/TrendingAnime";
import { Suspense } from "react";
import Loading from "../components/loading";
import { ANIME, IAnimeResult, ISearch, META } from "@consumet/extensions";
import HomeHeader from "@/components/HomeHeader/HomeHeader";

import HomeSidebar from "@/components/HomeSidebar/HomeSidebar";
import { getSeasonalAnime } from "@/helpers/AxiosInterceptor";
import { HoverCardReusableContent } from "@/components/HoverCard/HoverCard";
import GenreCard from "@/components/GenreCard/GenreCard";
export default async function Home() {
  const animeProvider = new META.Anilist(new ANIME.Gogoanime());
  const result = await animeProvider.fetchTrendingAnime(1, 24);
  const trendingToday = await getSeasonalAnime("WINTER");
  // const trendingToday = await animeProvider.fetchTrendingAnime();

  return (
    <main className="grid grid-cols-8 min-h-screen min-w-screen gap-2 ">
      <div className="col-span-6 flex flex-1 flex-col min-h-screen mt-5 overflow-clip">
        <HomeHeader result={result} />
        <Suspense fallback={<Loading />}>
          <PopularAnime />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <TrendingAnime result={result} />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <ReleasingAnime />
        </Suspense>
      </div>
      <div className="mt-5 col-span-2 flex items-center flex-col">
        <HomeSidebar trendingToday={trendingToday} />
        <GenreCard />
      </div>
    </main>
  );
}
