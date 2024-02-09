"use client";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import Search from "../Search/Search";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const session = useSession();
  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home", href: "/" },
    { id: 2, text: "Movies", href: "" },
    { id: 3, text: "Manga", href: "" },
    { id: 4, text: "My List", href: "" },
    { id: 5, text: "Contact", href: "" },
  ];

  return (
    <div className="fixed bg-shade-color z-[50000] max-w-[100%] pr-5 flex justify-between items-center h-16 w-full text-white">
      {/* Logo */}
      <div className="flex items-center pl-2">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex h-full gap-4 w-[100%] justify-center items-center">
          {navItems.map((item) => (
            <Link key={item.id} href={item?.href}>
              <li className=" text-slate-300 font-bold text-lg md:min-w-fit hover:text-[#FF4500] rounded-xl cursor-pointer duration-300">
                {item.text}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <section className="flex   items-center ">
        <Search />
        {/* <FaUser className="text-xl" /> */}
        <Link href={"/api/auth/signin"}>
          {!session?.data ? <div>Sign In</div> : <FaUser className="text-xl" />}
        </Link>
        <IoIosNotifications className="ml-2 mr-2 text-2xl" />
      </section>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        <AiOutlineMenu size={20} />
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "z-[10000] bg-base-color fixed md:hidden left-0 top-0 w-[100%] h-full border-r border-r-gray-900 ease-in-out duration-500"
            : "z-[10000] bg-base-color ease-in-out w-[100%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <div className="w-[90%] text-3xl font-bold text-[#FF4500] m-4 flex justify-between items-center">
          <p>Animenation</p>
          <AiOutlineClose size={20} onClick={handleNav} />
        </div>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <Link key={item.id} href={"/"}>
            <li
              key={item.id}
              className="font-bold text-xl p-4 border-b  duration-300 hover:text-[#FF4500] cursor-pointer border-gray-600"
            >
              {item.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
// import React from "react";
// import { IAnimeResult, ISearch } from "@consumet/extensions";
// import Link from "next/link";
// import Search from "../Search/Search";
// import { IoIosNotifications } from "react-icons/io";
// import { FaUser } from "react-icons/fa";
// export type SliderProps = {
//   trendingAnime: ISearch<IAnimeResult>;
// };

// export default function Navbar() {
//   return (
//     <div className="fixed bg-base-color  w-full h-12 z-[100] flex justify-between items-center">
//       <section className="flex w-5/12 justify-around items-center">
//         <Link href={"/"}>
//           <div>Home</div>
//         </Link>
//         <div>Movies</div>
//         <div>Manga</div>
//         <div>My List</div>
//       </section>
//       <section className="flex w-3/12  items-center ">
//         <Search />
//         <IoIosNotifications className="ml-2 mr-2" />
//         <FaUser />
//       </section>
//     </div>
//   );
// }
