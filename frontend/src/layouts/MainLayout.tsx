import { MdOutlineDashboard } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { PiTreeStructureLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
// import { FiSettings } from "react-icons/fi";
import { NavLink, Outlet } from "react-router";
import { JSX, useEffect, useRef, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { RootState } from "../store";
import { useSelector } from "react-redux";

const adminMenuItems = [
  {
    to: "/admin/dashboard",
    icon: <MdOutlineDashboard className="sidebar-icons" />,
    label: "Dashboard",
  },
  {
    to: "/admin/employees",
    icon: <GrGroup className="sidebar-icons" />,
    label: "Employees",
  },
  {
    to: "/admin/departments",
    icon: (
      <PiTreeStructureLight className="sidebar-icons rotate-90 scale-150" />
    ),
    label: "Departments",
  },
  {
    to: "/admin/profile",
    icon: <FaRegUser className="sidebar-icons" />,
    label: "Profile",
  },
  // {
  //   to: "/admin/settings",
  //   icon: <FiSettings className="sidebar-icons" />,
  //   label: "Settings",
  // },
];
const userMenuItems = [
  {
    to: "/dashboard",
    icon: <MdOutlineDashboard className="sidebar-icons" />,
    label: "Dashboard",
  },
  {
    to: "/files",
    icon: <GrGroup className="sidebar-icons" />,
    label: "Files",
  },
  {
    to: "/department",
    icon: (
      <PiTreeStructureLight className="sidebar-icons rotate-90 scale-150" />
    ),
    label: "Department",
  },
  {
    to: "/profile",
    icon: <FaRegUser className="sidebar-icons" />,
    label: "Profile",
  },
  // {
  //   to: "/admin/settings",
  //   icon: <FiSettings className="sidebar-icons" />,
  //   label: "Settings",
  // },
];

const MainLayout = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  return (
    <section className="bg-background h-screen relative text-general overflow-y-hidden max-w-[3072px] mx-auto">
      <AdminNavbar />
      {userInfo?.role === "admin" ? (
        <SideMenu menuList={adminMenuItems} />
      ) : (
        <SideMenu menuList={userMenuItems} />
      )}

      <section className="py-4 px-8 overflow-y-scroll relative flex flex-col gap-4 md:w-[75%] h-[85%] md:ml-auto ">
        <Outlet />
      </section>
    </section>
  );
};

export default MainLayout;

const SideMenu = ({
  menuList,
}: {
  menuList: {
    to: string;
    icon: JSX.Element;
    label: string;
  }[];
}) => {
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <>
      {/* Mobile Sidebar */}
      <section
        onClick={() => setToggle((prev) => !prev)}
        className={`bg-secondary text-background fixed z-50 left-0 h-full cursor-pointer rounded-tr-2xl rounded-br-2xl transition-all ${
          toggle ? "w-28" : "w-[15px] md:hidden"
        }`}
      >
        <ul
          ref={menuRef}
          className={`flex-col gap-4 py-4 px-2 ${toggle ? "flex" : "hidden"}`}
        >
          {menuList.map(({ to, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `icon-container ${
                    isActive
                      ? "icon-container-active"
                      : "icon-container-inactive"
                  }`
                }
              >
                {icon}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>

      {/* Desktop Sidebar */}
      <section className="hidden md:flex bg-secondary text-background  py-4 px-2 lg:py-8 lg:px-2 absolute z-50 left-0 h-full rounded-tr-2xl rounded-br-2xl min-w-[210px] md:w-[25%] xl:w-[23%]">
        <ul className="flex-col gap-4 flex w-full">
          {menuList.map(({ to, icon, label }) => (
            <li key={to} className="mx-auto w-full xl:w-[90%]">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `icon-container ${
                    isActive
                      ? "icon-container-active"
                      : "icon-container-inactive"
                  }`
                }
              >
                {icon}
                <p className="text-xl lg:text-2xl">{label}</p>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
