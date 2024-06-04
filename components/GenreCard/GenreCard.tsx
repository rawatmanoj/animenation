import React from "react";
import { Card, CardHeader } from "../ui/card";
import { genres } from "@/helpers/constants";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function GenreCard() {
  return (
    <div className="mt-10 w-5/6">
      <div className="text-xl font-bold text-special">Genres</div>
      <Card className="bg-shade-color border-0 p-2 mt-2 grid grid-cols-3 gap-2">
        {genres.map((genre) => (
          <Button
            key={genre?.label}
            className="text-sm bg-transparent hover:bg-base-color font-semibold flex justify-start"
          >
            {genre?.label}
          </Button>
        ))}
      </Card>
    </div>
  );
}
