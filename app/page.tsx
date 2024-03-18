import ReusableCard, { ReusableCardTypes } from "@/components/Cards/Cards";
import PopularAnime from "@/components/Home/PopularAnime/PopularAnime";
import ReleasingAnime from "@/components/Home/ReleasingAnime/ReleasingAnime";
import TrendingAnime from "@/components/Home/TrendingAnime/TrendingAnime";
import { Suspense } from "react";
import Loading from "../components/loading";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import HomeHeader from "@/components/HomeHeader/HomeHeader";
import HomeHeaderLoader from "@/components/HomeHeader/HomeHeaderLoader";
import { Card, CardHeader } from "@/components/ui/card";
import SideReusableCard from "@/components/Cards/SideCards";
import { getSeasonalAnime } from "@/helpers/AxiosInterceptor";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default async function Home() {
  const animeProvider = new META.Anilist();
  const delay = (func: any): Promise<ISearch<IAnimeResult> | undefined> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(func);
      }, 10000);
    });
  };
  const result = await animeProvider.fetchTrendingAnime();
  const trendingToday = await getSeasonalAnime();
  // const trendingToday = await animeProvider.fetchTrendingAnime();

  console.log(trendingToday?.Page?.media, "trendingTodaytrendingToday");

  return (
    <main className="grid grid-cols-8 min-h-screen min-w-screen gap-2 ">
      <div className="col-span-6 flex flex-1 flex-col min-h-screen mt-5 ">
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
        <div className="pt-4 pb-4 flex justify-between w-4/5">
          <div className="text-xl font-bold text-special">Top 10</div>
          <div className="flex gap-2">
            {/* <div className="text-sm font-bold text-special">Winterd</div>
            <div className="text-sm font-bold text-special">Fall</div>
            <div className="text-sm font-bold text-special">Summer</div> */}
            <Tabs
              // defaultValue={typeParams}
              className="w-full  flex justify-center items-center "
            >
              <TabsList className="bg-shade-color">
                <TabsTrigger
                  className=" data-[state=active]:bg-special data-[state=active]:text-white"
                  // onClick={() => handleTabClick("subs")}
                  value="Winter"
                >
                  Winter
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-special data-[state=active]:text-white"
                  // onClick={() => handleTabClick("dubs")}
                  value="Fall"
                >
                  Fall
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-special data-[state=active]:text-white"
                  // onClick={() => handleTabClick("dubs")}
                  value="Summer"
                >
                  Summer
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <Card className="bg-shade-color border-0 w-4/5 p-2">
          {/* <CardHeader>Top 10</CardHeader> */}
          {trendingToday?.Page?.media?.map((info: any, index: number) => {
            return (
              <div
                key={info?.id}
                className="text-white pt-4 pb-4 m-2 border-b-[1px] border-[#505562]"
                // className="basis-[40%] sm:basis-[30%] md:basis-[20%] lg:basis-[12%] "
              >
                <SideReusableCard
                  imageUrl={info.image || info?.coverImage?.large}
                  title={info?.title as ReusableCardTypes["title"]}
                  rating={info?.rating || info?.averageScore}
                  id={info?.id}
                  index={index}
                  duration={info?.duration}
                />
              </div>
            );
          })}
        </Card>
      </div>
    </main>
  );
}
