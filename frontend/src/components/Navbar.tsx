import { IoMdMenu } from "react-icons/io";

const Navbar = () => {
  return (
    <ul className="p-4  w-full flex justify-between items-center">
      <li className="">Logo</li>
      <li className="">
        <IoMdMenu className="text-2xl text-background" />
      </li>
    </ul>
  );
};

export default Navbar;
