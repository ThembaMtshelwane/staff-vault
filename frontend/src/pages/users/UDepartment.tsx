import { useState } from "react";
import EmployeeCard from "../../components/EmployeeCard";
import PaginationUI from "../../components/PaginationUI";
import {
  useGetUsersQuery,
} from "../../slices/userApiSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { useSelector } from "react-redux";
import { useGetDepartmentQuery } from "../../slices/departmentApiSlice";

const uDepartment = () => {
  const limit = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const { data: employees, isLoading } = useGetUsersQuery({
    page: currentPage,
    search,
  });
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data: department } = useGetDepartmentQuery({
    id: userInfo.department || "",
  });

  return (
    <>
      <h1>Department.</h1>
      <h2>{department?.data.name || "Not Available"}.</h2>

      <div className="flex flex-col gap-2">
        <h3>
          Supervisor: {department?.data.supervisor?.name || "Not Available"}.
        </h3>
        <p>Email: {department?.data.supervisor?.email || "Not Available"}</p>
      </div>

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
            totalElements={employees.pagination.totalUsers}
            totalPages={employees.pagination.totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
};

export default uDepartment;
