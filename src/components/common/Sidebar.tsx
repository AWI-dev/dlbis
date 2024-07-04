import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import Logo from '../images/logo/logo.png';
import Logo from "../common/Logo";
import {
  LayoutGrid,
  X,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "false"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-50 flex h-screen flex-col overflow-y-hidden 
      bg-white duration-200 ease-linear dark:bg-boxdark 2xl:static 2xl:translate-x-0 w-[14rem] ${
        sidebarOpen
          ? "translate-x-0 xl:-translate-x-full "
          : "-translate-x-full xl:translate-x-0 xl:static"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="absolute mt-5 mr-5 right-0 ">
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block xl:hidden order-1 "
        >
          <X className="h-4" />
        </button>
      </div>
      <div className="flex items-center flex-col lg:flex-row justify-between lg:justify-center gap-2 px-6 py-5 lg:py-6 pt-10">
        <NavLink to="/" className="order-2">
          <Logo />
        </NavLink>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear font-semibold ">
        {/* <!-- Sidebar Menu --> */}
        <nav className=" px-4 lg:mt-5 lg:px-4">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col gap-3">
              <li>
                <NavLink
                  to="/"
                  className={`text-md  flex items-center gap-6 rounded-md p-2 text-customPrimary duration-300 ease-in-out hover:bg-cta hover:text-white dark:hover:bg-meta-4 ${
                    pathname === "/" && "bg-cta dark:bg-meta-4 !text-white"
                  }`}
                >
                  <LayoutGrid className="h-5" />
                  Dashboard
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/users"
                  className={`text-md flex items-center gap-6 rounded-md p-2 text-customPrimary duration-300 ease-in-out hover:bg-cta hover:text-white dark:hover:bg-meta-4 ${
                    pathname.includes("users") &&
                    "bg-cta dark:bg-meta-4 !text-white"
                  }`}
                >
                  <Users className="h-5" />
                  Users
                </NavLink>
              </li> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
