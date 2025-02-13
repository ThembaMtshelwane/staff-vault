import { MdOutlineDashboard } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { PiTreeStructureLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Outlet } from "react-router";

import { useEffect, useRef, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <section className="bg-background h-screen relative">
      <AdminNavbar />
      <SideMenu />

      <section className="border">
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
      <section
        className={`w-fit py-4 px-2 bg-secondary text-background absolute left-0 transform translate-y-[25%] rounded-tr-2xl rounded-br-2xl
        }`}
      >
        {toggle ? (
          <ul ref={menuRef} className="flex flex-col gap-4 ">
            <li className="icon-container">
              <MdOutlineDashboard className="sidebar-icons" />
            </li>
            <li className="icon-container">
              <GrGroup className="sidebar-icons" />
            </li>
            <li className="icon-container">
              <PiTreeStructureLight className="sidebar-icons rotate-90 font-extrabold" />
            </li>
            <li className="icon-container">
              <FaRegUser className="sidebar-icons" />
            </li>
            <li className="icon-container">
              <FiSettings className="sidebar-icons" />
            </li>
          </ul>
        ) : (
          <div
            onClick={() => setToggle(true)}
            className="h-[55vh] w-[5px] "
          ></div>
        )}
      </section>
    </>
  );
};
