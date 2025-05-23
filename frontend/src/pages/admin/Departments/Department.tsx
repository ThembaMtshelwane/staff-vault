import { Link, useNavigate, useParams } from "react-router";
import {
  useDeleteDepartmentMutation,
  useGetDepartmentQuery,
} from "../../../slices/departmentApiSlice";
import { CustomSpinner } from "../../../components/CustomSpinner";
import {
  useGetFilteredUsersQuery,
  useGetUserQuery,
} from "../../../slices/userApiSlice";
import EmployeeCard from "../../../components/EmployeeCard";
import ReturnIcon from "../../../components/ReturnIcon";
import PaginationUI from "../../../components/PaginationUI";
import { useState } from "react";

const Department = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetDepartmentQuery({ id: String(id) });
  const {
    data: employees,
    isLoading,
    isError,
  } = useGetFilteredUsersQuery({
    page: 1,
    search: "",
    department: String(id),
  });
  const { data: employee } = useGetUserQuery(data?.data.supervisor || "");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const navigate = useNavigate();

  const departmentName = data?.data.name || "Not Available";
  const superviourFirstName = employee?.data.firstName;
  const superviourLastName = employee?.data.lastName;
  const staff = employees?.pagination.totalDocuments;
  const supervisor =
    superviourFirstName && superviourLastName
      ? `${superviourFirstName} ${superviourLastName}`
      : "Not Available";

  const handleDeleteDepartment = async () => {
    const res = await deleteDepartment(String(id));
    if (res.data?.success) {
      navigate("/admin/departments");
    }
  };

  return (
    <>
      <div className="flex items-start gap-2">
        <ReturnIcon />
        <h1 className="">{departmentName}.</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <div>
          <h3>Supervisor: {supervisor}.</h3>
          <p>Contact: {employee?.data.email}</p>
          <p>Total staff: {staff}</p>
        </div>
        <div className="flex gap-4 justify-center  w-full sm:w-[40%]">
          <Link to={`../edit/${id}`} className="button w-[150px]">
            Edit
          </Link>
          <button onClick={handleDeleteDepartment} className="button w-[150px]">
            Delete
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <CustomSpinner isLoading={isLoading} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 items-center justify-center auto-cols-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  relative">
            {employees?.data.slice(0, 18).map((employee) => (
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
              limit={12}
              currentPage={currentPage}
              totalElements={employees.pagination.totalDocuments}
              totalPages={employees.pagination.totalPages}
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

export default Department;
