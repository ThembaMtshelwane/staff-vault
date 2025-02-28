import { useState } from "react";
import UEmployeeCard from "../../components/uEmployeeCard";
import PaginationUI from "../../components/PaginationUI";
import { useGetUsersQuery } from "../../slices/userApiSlice";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useGetDepartmentQuery } from "../../slices/departmentApiSlice";
import { CustomSpinner } from "../../components/CustomSpinner";

const uDepartment = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const limit = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { data: department } = useGetDepartmentQuery({
    id: userInfo?.department || "",
  });

  const {
    data: departmentEmployees,
    isLoading,
    isError,
  } = useGetUsersQuery({
    page: currentPage,
    search,
    department: userInfo?.department || "",
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
              />
            ))}
          </div>
          {departmentEmployees?.data.length && (
            <PaginationUI
              limit={12}
              currentPage={currentPage}
              totalElements={departmentEmployees.pagination.totalUsers}
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

export default uDepartment;
