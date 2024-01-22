"use client";
import { IAnimeResult, ISearch, META } from "@consumet/extensions";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import { ReusableCardTypes } from "../Cards/Cards";

export type HomeHeaderProps = {
  result: ISearch<IAnimeResult> | undefined;
};
export default function HomeHeader({ result }: HomeHeaderProps) {
  return (
    <div className="mt-10">
      <Carousel
        itemAriaLabel="dv"
        autoPlay
        additionalTransfrom={0}
        arrows={false}
        autoPlaySpeed={3000}
        centerMode={false}
        // className="w-screen"
        containerClass=""
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {result?.results.map((info, index) => {
          if (index <= 10)
            return (
              <div className="" style={{ width: "100%", height: "500px" }}>
                <Image
                  className="rounded-md shadow-md opacity-20"
                  src={info?.cover || ""}
                  alt="Card Image"
                  loading="eager"
                  quality={50}
                  fill
                />
                <div className="pl-5 absolute pb-5 h-full w-7/12 flex flex-col  items-left justify-end">
                  <div className="text-4xl mb-5">
                    {(info?.title as ReusableCardTypes["title"]).userPreferred
                      .length > 50
                      ? (
                          info?.title as ReusableCardTypes["title"]
                        ).userPreferred?.slice(0, 50) + "..."
                      : (info?.title as ReusableCardTypes["title"])
                          .userPreferred}
                  </div>

                  <div>
                    <div>
                      {info?.description?.length > 50
                        ? info?.description?.slice(0, 300) + "..."
                        : info?.description}
                    </div>
                  </div>
                </div>
              </div>
            );
        })}
      </Carousel>
    </div>
  );
}
