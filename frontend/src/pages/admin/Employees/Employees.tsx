import { IoAddCircleOutline, IoSearch } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { useGetUsersQuery } from "../../../slices/userApiSlice";
import EmployeeCard from "../../../components/EmployeeCard";

const Employees = () => {
  const { data } = useGetUsersQuery();
  return (
    <>
      <h1>Manage Employees.</h1>

      <div className="flex flex-col gap-2 md:flex-row justify-between">
        <div className="button w-fit flex items-center px-4 gap-2">
          <IoAddCircleOutline className="text-2xl" />
          <p>Add Employees</p>
        </div>

        <div className=" flex gap-1 w-full md:w-[50%] max-w-[450px]">
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

          <div className="  w-[20%] text-background  flex items-center justify-around bg-secondary rounded-lg">
            <CiFilter className="text-2xl font-extrabold" />
            <div className="hidden">
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>20 out of {data?.data.length}</p>
      </div>

      <div className="grid gap-4 items-center justify-center auto-cols-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll ">
        {data?.data.slice(0, 20).map((employee) => (
          <EmployeeCard
            key={employee._id}
            firstName={employee.firstName}
            lastName={employee.lastName}
            position={employee.position}
            id={employee._id}
          />
        ))}
      </div>
    </>
  );
};

export default Employees;
