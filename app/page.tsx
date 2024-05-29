import ReusableCard, { ReusableCardTypes } from "@/components/Cards/Cards";
import PopularAnime from "@/components/Home/PopularAnime/PopularAnime";
import ReleasingAnime from "@/components/Home/ReleasingAnime/ReleasingAnime";
import TrendingAnime from "@/components/Home/TrendingAnime/TrendingAnime";
import { Suspense } from "react";
import Loading from "../components/loading";
import { ANIME, IAnimeResult, ISearch, META } from "@consumet/extensions";
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import HomeHeaderLoader from "@/components/HomeHeader/HomeHeaderLoader";
import { Card, CardHeader } from "@/components/ui/card";
import SideReusableCard from "@/components/Cards/SideCards";
import { getSeasonalAnime } from "@/helpers/AxiosInterceptor";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HoverCard } from "@/components/ui/hover-card";
import { HoverCardReusableContent } from "@/components/HoverCard/HoverCard";
import HomeSidebar from "@/components/HomeSidebar/HomeSidebar";
export default async function Home() {
  const animeProvider = new META.Anilist(new ANIME.Gogoanime());
  const delay = (func: any): Promise<ISearch<IAnimeResult> | undefined> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(func);
      }, 10000);
    });
  };
  const result = await animeProvider.fetchTrendingAnime();
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
      <HomeSidebar trendingToday={trendingToday} />
    </main>
  );
}
