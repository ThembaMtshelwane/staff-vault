import ContentControls from "../../../components/ContentControls";
import { CustomSpinner } from "../../../components/CustomSpinner";
import DepartmentCard from "../../../components/DepartmentCard";
import { useGetDepartmentsQuery } from "../../../slices/departmentApiSlice";

const Departments = () => {
  const { data: departments, isLoading } = useGetDepartmentsQuery();
  return (
    <>
      <h1>Manage Departments.</h1>
      <ContentControls
        addFunctionName={"Department"}
        addLink={"add-department"}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <CustomSpinner isLoading={isLoading} />
        </div>
      ) : (
        <>
          <div className="grid gap-4 items-center justify-center auto-cols-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-scroll relative">
            {departments?.data.map((department) => (
              <DepartmentCard
                key={department._id}
                name={department.name}
                id={department._id}
                email={department.email}
                superviour={department.supervisor || ""}
                staff={department.staff.length}
              />
            ))}
          </div>
          {departments?.data.length && (
            <div className="border w-full flex justify-center">
              <p className=" md:px-4 MD:py-2 rounded-lg bg-white font-semibold">
                20 out of {departments?.data.length}
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Departments;
