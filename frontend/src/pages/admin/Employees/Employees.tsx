import { useGetUsersQuery } from "../../../slices/userApiSlice";
import EmployeeCard from "../../../components/EmployeeCard";
import { CustomSpinner } from "../../../components/CustomSpinner";
import ContentControls from "../../../components/ContentControls";
import { useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const Employees = () => {
  const limit = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: employees, isLoading } = useGetUsersQuery(currentPage);

  return (
    <>
      <h1>Manage Employees.</h1>

      <ContentControls addFunctionName={"Employees"} addLink={"add-employee"} />

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <CustomSpinner isLoading={isLoading} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 items-center justify-center auto-cols-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll relative scroll">
            {employees?.data.map((employee) => (
              <EmployeeCard
                key={employee._id}
                firstName={employee.firstName}
                lastName={employee.lastName}
                position={employee.position}
                id={employee._id}
              />
            ))}
          </div>
          {employees?.data.length && (
            <div className=" w-full flex justify-center items-center flex-col">
              <p>
                {limit * currentPage > employees.pagination.totalUsers
                  ? employees.pagination.totalUsers
                  : limit * currentPage}{" "}
                out of {employees.pagination.totalUsers} employees
              </p>
              <div className="flex items-center gap-4">
                <button
                  className="button"
                  onClick={() => {
                    if (currentPage >1) {
                      setCurrentPage((prev) => prev - 1);
                    }
                  }}
                >
                  <IoArrowBack />
                </button>
                <input
                  className="w-[60px] text-center flex items-center justify-center"
                  type="number"
                  value={currentPage}
                  max={employees.pagination.totalPages}
                  min={1}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                />
                of
                <div>{employees.pagination.totalPages}</div>
                <button
                  className="button"
                  onClick={() => {
                    if (currentPage < employees.pagination.totalPages) {
                      setCurrentPage((prev) => prev + 1);
                    }
                  }}
                >
                  <IoArrowForward />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Employees;
