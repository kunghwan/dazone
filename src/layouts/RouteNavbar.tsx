import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
interface Props {
  menuHandler: () => void;
}

interface Menu {
  to: string;
  name: string;
}

const RouteNavbar = ({ menuHandler }: Props) => {
  const menus: Menu[] = [
    { to: "/", name: "Home" },
    { to: "/cart", name: "cart" },
    { to: "/product", name: "product" },
    { to: "/myAccount", name: "myAccount" },
  ];

  const location = useLocation();

  return (
    <nav
      className={twMerge(
        "fixed top-15, right-0  w-full bg-white z-10 transition right-0 border-gray-500 border-l-0 border-r-0 border-border theme-base md:relative md:flex md:auto md:top-0"
      )}
    >
      {menus.map(({ name, to }) => {
        const isCurrentPath = to === location.pathname;

        return (
          <Link
            to={to}
            key={name}
            onClick={menuHandler}
            className={twMerge(
              "hover:shadow-none hover:bg-bg hover:text-theme dark:hover:bg-darkBorder",
              isCurrentPath && "text-theme"
            )}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default RouteNavbar;
