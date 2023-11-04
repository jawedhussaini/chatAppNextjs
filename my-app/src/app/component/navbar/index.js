"use client";

import { Fragment, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { GloblaContext } from "@/app/context";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {user}=useContext(GloblaContext)

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="w-full m-auto grid grid-cols-5 gap-3">
          <div className="w-full p-4 flex col-span-2 items-center justify-center">
            <span className="self-center  text-2xl font-semibold whitespace-nowrap -mr-16">
              ChatApp
            </span>
          </div>
          <div className="w-full col-span-2  p-4 pt-5 flex items-center justify-center">
            <input
              className="appearance-none border w-full py-5 rounded-full px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="search"
              type="text"
              placeholder="SEARCH..."
            />
          </div>
          <div className="w-full p-4 pt-5 flex items-center justify-end">
            <img
              src={user !== null ? user.imgUrl : null }
              className="h-16 w-16 rounded-full object-cover mr-20"
            />
            <div className="h-4 w-4 absolute right-[6rem] top-7 rounded-full border-white border-2 bg-green-400 shadow-white shadow-2xl"></div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
