import { MdOutlineDashboard } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { PiTreeStructureLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Outlet } from "react-router";

import { useState } from "react";

const AdminLayout = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <section className="bg-background h-screen relative">
      {/* <Navbar /> */}

      {toggle ? (
        <div onClick={() => setToggle((prev) => !prev)}>lip</div>
      ) : (
        <SideMenu />
      )}

      <section className="border">
        <Outlet />
      </section>
    </section>
  );
};

export default AdminLayout;

const SideMenu = () => {
  return (
    <section className="border border-red-600 w-fit p-2 bg-secondary text-background absolute left-0 transform translate-y-[25%]">
      <ul className="border border-blue-400 flex flex-col gap-4 ">
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
    </section>
  );
};
