import { useGetUsersQuery } from "../../../slices/userApiSlice";
import EmployeeCard from "../../../components/EmployeeCard";
import { CustomSpinner } from "../../../components/CustomSpinner";
import ContentControls from "../../../components/ContentControls";

const Employees = () => {
  const { data: employees, isLoading } = useGetUsersQuery();

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
          {employees?.data.length && (
            <div className=" w-full flex justify-center">
              <p className=" md:px-4 md:py-2 rounded-lg bg-white font-semibold">
                20 out of {employees?.data.length}
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Employees;
