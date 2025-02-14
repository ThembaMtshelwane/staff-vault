import { IoAddCircleOutline, IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";

const Employees = () => {
  return (
    <>
      <h1>Manage Employees.</h1>
      <div className="flex flex-col gap-2">
        <div className="button w-fit flex items-center px-4 gap-2">
          <IoAddCircleOutline className="text-2xl" />
          <p>Add Employees</p>
        </div>

        <div className=" flex gap-1">
          <label htmlFor="search" className="w-[80%]  flex items-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for employees"
              className="rounded-tr-none rounded-br-none w-[80%]"
            />
            <div className="bg-secondary w-[20%] h-full text-background flex items-center justify-center rounded-tr-lg rounded-br-lg">
              <IoSearch className="text-2xl" />
            </div>
          </label>

          <div className=" -yellow-300 w-[20%] text-background  flex items-center justify-around bg-secondary rounded-lg">
            <CiFilter className="text-2xl font-extrabold" />
            <div className="hidden">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employees;
