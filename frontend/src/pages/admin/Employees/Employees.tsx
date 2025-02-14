import { IoAddCircleOutline, IoSearch } from "react-icons/io5";
import { useGetUsersQuery } from "../../../slices/userApiSlice";
import EmployeeCard from "../../../components/EmployeeCard";
import { Link } from "react-router";
import { useGetDepartmentsQuery } from "../../../slices/departmentApiSlice";
import Filter from "../../../components/Filter";

const Employees = () => {
  const { data: employees } = useGetUsersQuery();
  const { data: departments } = useGetDepartmentsQuery();
  return (
    <>
      <h1>Manage Employees.</h1>

      <div className="flex flex-col gap-2 md:flex-row justify-between">
        <Link
          to="add-employee"
          className="button w-fit flex items-center px-4 gap-2"
        >
          <IoAddCircleOutline className="text-2xl" />
          <p>Add Employees</p>
        </Link>

        <div className=" flex gap-1 w-full md:w-[50%] max-w-[450px] relative">
          <div className="w-[80%]  flex items-center">
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
          </div>
          <Filter filterOptions={departments?.data || []} />
        </div>
      </div>
      <div>
        <p>20 out of {employees?.data.length}</p>
      </div>

      <div className="grid gap-4 items-center justify-center auto-cols-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll ">
        {employees?.data.slice(0, 20).map((employee) => (
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
