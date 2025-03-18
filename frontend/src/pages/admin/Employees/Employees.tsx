import { useGetFilteredUsersQuery } from "../../../slices/userApiSlice";
import EmployeeCard from "../../../components/EmployeeCard";
import { CustomSpinner } from "../../../components/CustomSpinner";
import ContentControls from "../../../components/ContentControls";
import { useState } from "react";
import PaginationUI from "../../../components/PaginationUI";

const Employees = () => {
  const limit = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const { data: employees, isLoading } = useGetFilteredUsersQuery({
    page: currentPage,
    search,
    department,
  });

  return (
    <>
      <h1>Manage Employees.</h1>

      <ContentControls
        addFunctionName={"Employees"}
        addLink={"add-employee"}
        setSearch={setSearch}
        setDepartment={setDepartment}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <CustomSpinner isLoading={isLoading} />
        </div>
      ) : (
        <div>
          <div className="grid gap-4  justify-center auto-cols-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative scroll  h-full">
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
              totalElements={employees.pagination.totalDocuments}
              totalPages={employees.pagination.totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Employees;
