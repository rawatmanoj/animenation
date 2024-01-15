"use client";
import React from "react";
import ReusableCard, { ReusableCardTypes } from "../Cards/Cards";
import Slick from "react-slick";
import { IAnimeResult, ISearch } from "@consumet/extensions";
import Carousel from "react-multi-carousel";

export type SliderProps = {
  result: ISearch<IAnimeResult> | undefined;
  heading: string;
};
export default function Slider({ result, heading }: SliderProps) {
  return (
    <div className="mt-10 ">
      <div className="text-2xl ml-2">{heading}</div>
      <Carousel
        itemAriaLabel="dv"
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className="flex justify-center items-center"
        // containerClass="w-40"
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
            items: 8,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 4,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 6,
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
        {result?.results.map((info) => {
          return (
            <ReusableCard
              imageUrl={info.image}
              title={info?.title as ReusableCardTypes["title"]}
              key={info.id}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
