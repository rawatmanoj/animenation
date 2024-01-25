"use client";
import ReusableCard, { ReusableCardTypes } from "../Cards/Cards";
import { IAnimeResult, ISearch } from "@consumet/extensions";
import Carousel from "react-multi-carousel";

export type SliderProps = {
  result: ISearch<IAnimeResult> | undefined;
  heading: string;
};
export default function Slider({ result, heading }: SliderProps) {
  return (
    <div className="mt-5 ">
      <div className="text-md md:text-2xl  pl-2 font-bold">{heading}</div>
      <Carousel
        ssr
        itemAriaLabel="dv"
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        // className="w-screen"
        containerClass=" max-w-screen xs:max-h-96 max-h-min"
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
            items: 3,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 5,
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
              rating={info?.rating}
              id={info?.id}
            />
          );
        })}
      </Carousel>
    </div>
  );
}
