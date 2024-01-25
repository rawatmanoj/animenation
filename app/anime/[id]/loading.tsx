export default async function LoadingAnime() {
  //   const errorAnimeProvider = new ANIME.Zoro();

  return (
    <div className="w-full h-full min-h-dvh">
      <div className="lg:h-80 sm:h-60 h-40 bg-[#22335e] ">
        <div className="relative w-full h-full">
          <div
            className="rounded-md shadow-md "
            //style={{ width: "182px", height: "264px", background: "#22335e" }}
          ></div>
        </div>
      </div>
      <div className="flex w-full justify-center h-[100px]">
        <div className="animate-loading mr-4 rounded bg-[#1f2e55] flex flex-col items-center justify-end ml-2 h-36 w-24 sm:h-52 sm:w-36 lg:h-264 lg:w-185 relative lg:top-[-8rem] sm:top-[-6rem] top-[-4rem]">
          <div className="flex justify-between items-center relative bottom-[-40px]"></div>
        </div>
        <div className="animate-loading bg-[#1f2e55] w-7/12 sm:w-8/12 lg:w-8/12  p-5 mt-5 h-96 rounded"></div>
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
