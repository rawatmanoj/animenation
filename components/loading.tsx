import HomeHeader from "@/components/HomeHeader/HomeHeaderLoader";
import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-10 max-w-screen overflow-hidden">
      <div className="flex max-w-screen overflow-hidden justify-between">
        <div>
          <Skeleton className="h-[264px] w-[182px] rounded-xl bg-shade-color" />
          <div className="space-y-2 mt-2 ">
            <Skeleton className="h-6 w-[182px] bg-shade-color" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[264px] w-[182px] rounded-xl bg-shade-color" />
          <div className="space-y-2 mt-2 ">
            <Skeleton className="h-6 w-[182px] bg-shade-color" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[264px] w-[182px] rounded-xl bg-shade-color" />
          <div className="space-y-2 mt-2 ">
            <Skeleton className="h-6 w-[182px] bg-shade-color" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[264px] w-[182px] rounded-xl bg-shade-color" />
          <div className="space-y-2 mt-2 ">
            <Skeleton className="h-6 w-[182px] bg-shade-color" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[264px] w-[182px] rounded-xl bg-shade-color" />
          <div className="space-y-2 mt-2 ">
            <Skeleton className="h-6 w-[182px] bg-shade-color" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[264px] w-[182px] rounded-xl bg-shade-color" />
          <div className="space-y-2 mt-2 ">
            <Skeleton className="h-6 w-[182px] bg-shade-color" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[264px] w-[182px] rounded-xl bg-shade-color" />
          <div className="space-y-2 mt-2 ">
            <Skeleton className="h-6 w-[182px] bg-shade-color" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[264px] w-[182px] rounded-xl bg-shade-color" />
          <div className="space-y-2 mt-2 ">
            <Skeleton className="h-6 w-[182px] bg-shade-color" />
          </div>
        </div>
        <div>
          <Skeleton className="h-[264px] w-[182px] rounded-xl bg-shade-color" />
          <div className="space-y-2 mt-2 ">
            <Skeleton className="h-6 w-[182px] bg-shade-color" />
          </div>
        </div>
      </div>
    </div>
  );
}
