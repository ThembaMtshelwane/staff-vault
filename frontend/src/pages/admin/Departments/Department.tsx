import { useParams } from "react-router";
import { useGetDepartmentQuery } from "../../../slices/departmentApiSlice";
import { CustomSpinner } from "../../../components/CustomSpinner";
import { useGetUsersQuery } from "../../../slices/userApiSlice";
import EmployeeCard from "../../../components/EmployeeCard";
import ReturnIcon from "../../../components/ReturnIcon";

const Department = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetDepartmentQuery(String(id));
  const { data: employees, isLoading } = useGetUsersQuery();
  const name = data?.data.name || "Not Available";
  const email = data?.data.email || "Not Available";
  const staff = data?.data.staff;
  const supervisor = data?.data.supervisor || "Not Available";
  const location = "Not Available";

  return (
    <>
      <div className="flex items-start gap-2">
        <ReturnIcon />
        <h1 className="">{name}.</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <div>
          <h3>Supervisor: {supervisor}.</h3>
          <p>Contact: {email}</p>
          <p>Location: {location}</p>
          <p>Total staff: {staff?.length}</p>
        </div>
        <div className="flex gap-4 justify-center border w-full  sm:w-[40%]">
          <button className="button w-[150px]">Edit</button>
          <button className="button w-[150px]">Delete</button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <CustomSpinner isLoading={isLoading} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 items-center justify-center auto-cols-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll relative">
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
            <div className="border w-full flex justify-center">
              <p className=" md:px-4 MD:py-2 rounded-lg bg-white font-semibold">
                20 out of {employees?.data.length}
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Department;
