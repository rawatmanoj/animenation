import ReusableCard, { ReusableCardTypes } from "@/components/Cards/Cards";
import PopularAnime from "@/components/Home/PopularAnime/PopularAnime";
import ReleasingAnime from "@/components/Home/ReleasingAnime/ReleasingAnime";
import TrendingAnime from "@/components/Home/TrendingAnime/TrendingAnime";
import { Suspense } from "react";
import Loading from "../components/loading";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import Carousel from "react-multi-carousel";
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import HomeHeaderLoader from "@/components/HomeHeader/HomeHeaderLoader";

export default async function Home() {
  const delay = (func: any): Promise<ISearch<IAnimeResult> | undefined> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(func);
      }, 5000);
    });
  };
  const animeProvider = new META.Anilist();
  const result = (await delay(animeProvider.fetchTrendingAnime())) || undefined;
  return (
    <main className="flex flex-col min-h-screen min-w-screen">
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
    </main>
  );
}
