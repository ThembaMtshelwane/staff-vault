import { MdOutlineDashboard } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { PiTreeStructureLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { NavLink, Outlet } from "react-router";
import { useEffect, useRef, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <section className="bg-background h-screen relative max-h-[1080px]   ">
      <AdminNavbar />
      <SideMenu />
      <section
        className="border border-red-600 h-[90%] md:h-[85%] p-4 md:p-8 overflow-y-scroll
       flex flex-col gap-4 sm:px-8 md:w-[75%]  ml-auto
      "
      >
        <Outlet />
      </section>
    </section>
  );
};

export default AdminLayout;

const SideMenu = () => {
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
      <section className="min-w--[15px] h-[60%] min-h-[60%] bg-secondary text-background absolute left-0 transform translate-y-[20%] rounded-tr-2xl rounded-br-2xl hover:scale-102">
        {toggle ? (
          <ul ref={menuRef} className="flex flex-col gap-4 py-4 px-2 ">
            <li onClick={() => setToggle(false)}>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "icon-container-isActive"
                    : "icon-container-notActive"
                }
              >
                <MdOutlineDashboard className="sidebar-icons" />
              </NavLink>
            </li>
            <li onClick={() => setToggle(false)}>
              <NavLink
                to="/admin/employees"
                className={({ isActive }) =>
                  isActive
                    ? "icon-container-isActive"
                    : "icon-container-notActive"
                }
              >
                <GrGroup className="sidebar-icons" />
              </NavLink>
            </li>
            <li onClick={() => setToggle(false)}>
              <NavLink
                to="/admin/departments"
                className={({ isActive }) =>
                  isActive
                    ? "icon-container-isActive"
                    : "icon-container-notActive"
                }
              >
                <PiTreeStructureLight className="sidebar-icons rotate-90 font-extrabold" />
              </NavLink>
            </li>
            <li onClick={() => setToggle(false)}>
              <NavLink
                to="/admin/profile"
                className={({ isActive }) =>
                  isActive
                    ? "icon-container-isActive"
                    : "icon-container-notActive"
                }
              >
                <FaRegUser className="sidebar-icons" />
              </NavLink>
            </li>
            <li onClick={() => setToggle(false)}>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  isActive
                    ? "icon-container-isActive"
                    : "icon-container-notActive"
                }
              >
                <FiSettings className="sidebar-icons" />
              </NavLink>
            </li>
          </ul>
        ) : (
          <div
            onClick={() => setToggle(true)}
            className="h-full w-[15px]  cursor-pointer"
          ></div>
        )}
      </section>
    </>
  );
};
