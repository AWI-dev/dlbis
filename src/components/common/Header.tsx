import { Link } from "react-router-dom";
import Logo from "../../assets/Images/logo.png";
import DropdownUser from "./DropdownUser";
import { Button } from "@nextui-org/react";
import { Menu } from "lucide-react";
/* import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser"; */

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none shadow-md">
      <div className="flex flex-grow items-center justify-between py-4 pr-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center xl:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <Button
            size="sm"
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="xl:hidden bg-unset"
          >
            <Menu />
          </Button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className=" flex-shrink-0 w-10 h-10 hidden sm:block" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="hidden sm:block"></div>
        <div className="flex items-end gap-3 2xsm:gap-7">
          <ul className="flex items-end gap-2 2xsm:gap-4">
            {/*  <DarkModeSwitcher />

            <DropdownNotification />

            <DropdownMessage /> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
