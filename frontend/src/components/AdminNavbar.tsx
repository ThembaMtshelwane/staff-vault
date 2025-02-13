import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../slices/authSlice";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setToggle(false);
    try {
      await logout().unwrap();
      dispatch(clearCredentials());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ul className="py-4 px-2 sm:p-4 md:p-8 absolute w-full flex justify-between items-center bg-accent text-background z-[999] ">
      <li className=" hover:scale-102 cursor-pointer">
        <a href="/" className="flex  items-center gap-2">
          <img src="/logo.svg" alt="StaffVault logo" className="size-[50px]" />
          <span className="text-xl font-bold">StaffVault</span>
        </a>
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

            <li
              onClick={handleLogout}
              className=" text-3xl p-2 w-full  hover:text-accent hover:scale-102 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}

      <ul className="hidden md:flex  border">
        <li
          onClick={handleLogout}
          className="hover:text-accent hover:scale-102 cursor-pointer bg-secondary text-background text-center px-4 py-2 rounded-lg"
        >
          Logout
        </li>
      </ul>
    </ul>
  );
};

export default Navbar;
