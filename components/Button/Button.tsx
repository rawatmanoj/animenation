"use client";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
};
export default function Button({ children }: ButtonProps) {
  const handleClick = () => {};
  return (
    <button
      className="w-full p-1 pl-2 pr-2 bg-special rounded w-24 sm:w-36 lg:w-185 font-bold"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
