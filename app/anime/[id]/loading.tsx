import { Skeleton } from "@/components/ui/skeleton";

export default async function LoadingAnime() {
  //   const errorAnimeProvider = new ANIME.Zoro();

  return (
    <div className="w-full h-full min-h-dvh">
      <div className="lg:h-80 sm:h-60 h-40 ">
        <Skeleton className="relative w-full h-full bg-shade-color " />
      </div>
      <div className="flex w-full justify-center h-[100px]">
        <div className="animate-loading mr-4 rounded bg-shade-color flex flex-col items-center justify-end ml-2 h-36 w-24 sm:h-52 sm:w-36 lg:h-264 lg:w-185 relative lg:top-[-8rem] sm:top-[-6rem] top-[-4rem]">
          <div className="flex justify-between items-center relative bottom-[-40px]"></div>
        </div>
        <Skeleton className=" bg-shade-color  w-7/12 sm:w-8/12 lg:w-8/12  p-5 mt-5 h-96 rounded"></Skeleton>
      </div>
      <div className="flex w-full justify-center"></div>
    </div>
  );
}
