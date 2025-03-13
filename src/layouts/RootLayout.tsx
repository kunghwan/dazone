import { useState } from "react";
import { Outlet } from "react-router-dom";
import RouteNavbar from "./RouteNavbar";

import { IoMenu, IoSearch, IoSunny, IoMoon } from "react-icons/io5";

const RootLayout = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.body.className === "dark"
  );
  const menuHandler = () => setIsMenuActive((prev) => !prev);

  return (
    <>
      <header className="border-b border-b-border dark:bg-darkBg header dark:border-b-darkBorder">
        <div className=" flex gap-x-2.5 max-w-300 mx-auto p-2.5">
          <img alt="logo" className=" h-10 w-25 bg-gray-50" />
          <form
            className=" flex flex-1 gap-x-2.5"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              className=" flex-1 outline-none bg-bg px-2.5 dark:bg-darkBorder rounded"
              placeholder="검색어를 입력해주세요"
            />
            <button className="bg-theme text-bg text-2xl w-10 dark:text-darkBg">
              <IoSearch />
            </button>
          </form>
          <button
            onClick={() => {
              document.body.classList.toggle("dark");
              setIsDarkMode((prev) => !prev);
            }}
          >
            {isDarkMode ? (
              <IoMoon className="text-amber-300" />
            ) : (
              <IoSunny className="text-red-300" />
            )}
          </button>
          <button className=" text-2xl w-10 md:hidden" onClick={menuHandler}>
            <IoMenu />
          </button>
        </div>
        {isMenuActive && <RouteNavbar menuHandler={menuHandler} />}
      </header>

      <Outlet />
    </>
  );
};

export default RootLayout;
