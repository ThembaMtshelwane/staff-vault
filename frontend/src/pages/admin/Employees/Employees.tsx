import { useGetUsersQuery } from "../../../slices/userApiSlice";
import EmployeeCard from "../../../components/EmployeeCard";
import { CustomSpinner } from "../../../components/CustomSpinner";
import ContentControls from "../../../components/ContentControls";
import { useState } from "react";
import PaginationUI from "../../../components/PaginationUI";

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
            <PaginationUI
              limit={limit}
              currentPage={currentPage}
              totalElements={employees.pagination.totalUsers}
              totalPages={employees.pagination.totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </>
  );
};

export default Employees;
