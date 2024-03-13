import Button from "@/components/Button/Button";
import { ReusableCardTypes } from "@/components/Cards/Cards";
import { getAnime } from "@/helpers/AxiosInterceptor";
import { META, ANIME, ISource } from "@consumet/extensions";
import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { FaBeer, FaStar } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import Link from "next/link";
type AnimeProps = {
  params: { id: string };
};

export default async function Anime({ params: { id } }: AnimeProps) {
  //   const errorAnimeProvider = new ANIME.Zoro();
  let animeInfo;
  let res;
  const anilist = new META.Anilist(new ANIME.Gogoanime());
  try {
    animeInfo = await anilist.fetchAnimeInfo(id);
    // const servers = await anilist.fetchAnilistInfoById(id);
  } catch (error) {
    console.log(error);
    // animeInfo = await getAnime(id);
    // console.log(animeInfo?.Media?.studios.nodes, "animeinfoooo");
  }

  return (
    <div className="w-full h-full min-h-dvh">
      <div className="lg:h-80 sm:h-60 h-40 ">
        <div className="relative w-full h-full">
          <Image
            className="rounded-md shadow-md "
            src={animeInfo?.cover || animeInfo?.Media?.bannerImage || undefined}
            alt="Card Image"
            loading="eager"
            quality={50}
            fill
          />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center justify-end ml-2 h-36 w-24 sm:h-52 sm:w-36 lg:h-264 lg:w-185 relative lg:top-[-8rem] sm:top-[-6rem] top-[-4rem]">
          <Image
            className="rounded-md shadow-md "
            src={animeInfo?.image || animeInfo?.Media?.coverImage.large || ""}
            alt="Card Image"
            loading="eager"
            quality={50}
            fill
          />
          <div className="flex justify-between items-center relative bottom-[-40px]">
            <Link
              href={`/anime/watch/${id}?episode=${
                (animeInfo &&
                  animeInfo?.episodes &&
                  animeInfo?.episodes[0]?.id) ||
                ""
              }`}
            >
              <Button>Watch now</Button>
            </Link>
          </div>
        </div>
        <div className="w-10/12 sm:w-9/12 lg:w-8/12  p-5">
          <div className={`text-2xl`}>
            {(animeInfo?.title as ReusableCardTypes["title"])?.english ||
              animeInfo?.Media?.title?.userPreferred}
          </div>
          <div>
            <div className="flex items-center font-bold">
              <div className="text-lg ">
                {animeInfo?.studios ||
                  animeInfo?.Media?.studios.nodes[0].name ||
                  ""}
              </div>
              <span className="mr-1 ml-1">|</span>
              <span className="flex items-center">
                {(animeInfo?.rating && animeInfo?.rating / 10) ||
                  (animeInfo?.Media?.averageScore &&
                    animeInfo?.Media?.averageScore / 10) ||
                  ""}{" "}
                <FaStar className="ml-1 mr-1 font-xl" color="#FF4500" />
              </span>
              <span className="mr-1">|</span>
              <span>
                {animeInfo?.releaseDate || animeInfo?.Media?.seasonYear}
              </span>
            </div>
            <button className="mt-2 flex justify-around items-center border-solid border-2 border-[#FF4500] w-full p-1 pl-2 pr-2 rounded w-24 sm:w-36 lg:w-185 font-bold">
              <span>Wishlist</span>
              <span>
                {/* <CiBookmark color="#FF4500" /> */}
                <FaBookBookmark />
              </span>
            </button>
          </div>
          <div className="text-sm md:text-lg mt-4">
            {animeInfo?.description || animeInfo?.Media?.description}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        {/* <div className=" bg-red-500 flex flex-col  ml-2 h-52 w-24 sm:h-52 sm:w-36 lg:h-264 lg:w-185 relative ">
          <div className="p-3">
            <div className="flex flex-col mb-2">
              <span className="font-bold">Status</span>
              <span className="text-xs font-semibold">
                {animeInfo?.status || animeInfo?.Media?.status}
              </span>
            </div>
            <div className="flex flex-col mb-2">
              <span className="font-bold">Format</span>
              <span className="text-xs font-semibold">
                {animeInfo?.type || animeInfo?.Media?.format}
              </span>
            </div>
            <div className="flex flex-col mb-2">
              <span className="font-bold">Start Date</span>
              <span className="text-xs font-semibold">
                {animeInfo?.startDate?.day || 23}/
                {animeInfo?.startDate?.month || 1}/
                {animeInfo?.startDate?.year || 2021}
              </span>
            </div>
            <div className="flex flex-col mb-2">
              <span className="font-bold text-sm">Episodes</span>
              <span className="text-xs font-semibold">
                {animeInfo?.totalEpisodes || animeInfo?.Media?.episodes}
              </span>
            </div>
            <div className="flex flex-col mb-2">
              <span className="font-bold ">Studio</span>
              <span className="text-sm font-semibold">
                {animeInfo?.studios ||
                  animeInfo?.Media?.studios.nodes[0].name ||
                  ""}
              </span>
            </div>
          </div>
        </div> */}
        {/* <div className=" w-10/12 sm:w-9/12 lg:w-8/12  p-5 bg-red-500">
          <div>
            <div className="font-bolder text-xl w-full">Episodes</div>
            <div className="flex justify-around flex-wrap w-full ">
              {animeInfo?.episodes?.map((episode: any, index: number) => {
                if (index < 11)
                  return (
                    <div key={index} className="mb-4">
                      <Image
                        className="rounded-md shadow-md "
                        src={episode?.image || ""}
                        alt="Card Image"
                        width={180}
                        height={234}
                        loading="eager"
                        quality={50}
                      />
                    </div>
                  );
              })}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
