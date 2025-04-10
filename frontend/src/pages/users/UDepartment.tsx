import { useState } from "react";
import UEmployeeCard from "../../components/UEmployeeCard";
import PaginationUI from "../../components/PaginationUI";
import {
  useGetFilteredUsersQuery,
  useGetUserQuery,
} from "../../slices/userApiSlice";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useGetDepartmentQuery } from "../../slices/departmentApiSlice";
import { CustomSpinner } from "../../components/CustomSpinner";

const UDepartment = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const limit = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: department } = useGetDepartmentQuery({
    id: userInfo?.department || "",
  });

  const {
    data: departmentEmployees,
    isLoading,
    isError,
  } = useGetFilteredUsersQuery({
    page: currentPage,
    search: "",
    department: userInfo?.department || "",
  });

  const { data: supervisor } = useGetUserQuery(
    department?.data.supervisor || ""
  );
  return (
    <>
      <h1>Department.</h1>
      <h2>{department?.data.name || "Not Available"}.</h2>
      <div className="flex flex-col gap-2">
        <h3>
          Supervisor:{" "}
          {supervisor?.data.firstName && supervisor?.data.lastName
            ? `${supervisor?.data.firstName} ${supervisor?.data.lastName}`
            : "Not Available"}
          .
        </h3>
        <p>Email: {supervisor?.data.email || "Not Available"}</p>
        <p>Memmbers: {departmentEmployees?.data.length || 0}</p>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <CustomSpinner isLoading={isLoading} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 items-center justify-center auto-cols-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  relative">
            {departmentEmployees?.data.slice(0, 18).map((employee) => (
              <UEmployeeCard
                key={employee._id}
                firstName={employee.firstName}
                lastName={employee.lastName}
                position={employee.position}
                id={employee._id}
                department={department?.data.name}
              />
            ))}
          </div>
          {departmentEmployees?.data.length && (
            <PaginationUI
              limit={limit}
              currentPage={currentPage}
              totalElements={departmentEmployees.pagination.totalDocuments}
              totalPages={departmentEmployees.pagination.totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
      {isError && (
        <div className=" h-full flex justify-center">
          <h2>No users found.</h2>
        </div>
      )}
    </>
  );
};

export default UDepartment;
