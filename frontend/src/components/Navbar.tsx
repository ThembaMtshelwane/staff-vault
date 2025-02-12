import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <ul className="px-4 py-6  fixed w-full flex justify-between items-center text-background z-[999]">
      <li className="flex items-center gap-2">
        <img src="logo.svg" alt="StaffVault logo" className="size-[50px]" />
        <span className="text-xl font-bold">StaffVault</span>
      </li>
      <li className="">
        <IoMdMenu
          onClick={() => setToggle((prev) => !prev)}
          className="text-2xl text-background md:hidden"
        />
      </li>

      {toggle && (
        <div className="bg-gradient-to-r from-[rgba(0,0,0,0.4)] from-[-50%] to-secondary to-[20%] fixed top-0 left-0 inset-0 z-[999] py-8">
          <ul className=" flex flex-col p-8 gap-6 w-[70%] max-w-[270px]  ml-auto  md:static  ">
            <li className=" text-3xl  w-full   p-2">
              <IoClose
                onClick={() => setToggle((prev) => !prev)}
                className="ml-auto hover:text-accent hover:scale-[1.5] cursor-pointer"
              />
            </li>
            <li className=" text-3xl  p-2  w-full  hover:text-accent hover:scale-102 cursor-pointer">
              <a href="#about"> About</a>
            </li>
            <li className=" text-3xl  p-2 w-full  hover:text-accent hover:scale-102 cursor-pointer">
              <a href="#contact"> Contact</a>
            </li>
            <li className=" text-3xl p-2 w-full  hover:text-accent hover:scale-102 cursor-pointer">
              <Link to="register"> Register</Link>
            </li>
          </ul>
        </div>
      )}
    </ul>
  );
};

export default Navbar;
