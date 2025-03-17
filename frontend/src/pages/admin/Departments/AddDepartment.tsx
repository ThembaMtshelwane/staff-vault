import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useCreateDepartmentMutation } from "../../../slices/departmentApiSlice";
import ReturnHeader from "../../../components/ReturnHeader";
import { IDepartment } from "../../../definitions";
import { useGetUsersQuery } from "../../../slices/userApiSlice";

const AddDepartment = () => {
  const { data: employees } = useGetUsersQuery();
  const [createDepartment] = useCreateDepartmentMutation();
  const navigate = useNavigate();
  const [department, setDepartment] = useState<Partial<IDepartment>>({
    name: "",
    positions: [],
    supervisor: "",
  });

  // useEffect(() => {
  //   if (data) {
  //     setDepartment({
  //       name: data?.data.name || "",
  //       positions: data?.data?.positions || [],
  //       supervisor: data?.data?.supervisor || "",
  //     });
  //   }
  // }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSupervisorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSupervisorId = e.target.value;
    const selectedSupervisor = employees?.data.find(
      (employee) => employee._id === selectedSupervisorId
    );

    if (selectedSupervisor) {
      setDepartment((prev) => ({
        ...prev,
        supervisor: selectedSupervisorId,
      }));
    }
  };
  const handleCancel = () => {
    navigate("/admin/departments");
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("department  ", department);

    try {
      const res = await createDepartment(department);
      if (res?.data?.success) {
        navigate("/admin/departments");
      }
    } catch (error) {
      console.error("Failed to update department:", error);
    }
  };
  return (
    <>
      <div className="flex items-start gap-2">
        <ReturnHeader header={`Add a new department`} />
      </div>
      <div className="bg-white  w-full h-[90%] p-4 flex flex-col gap-4 rounded-lg md:w-[90%] ">
        <p className="text-lg ">
          Fill in the form below to add a new department to the system. Ensure
          all details are accurate before submitting.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="name">
              Department name:
              <input
                type="text"
                name="name"
                id="name"
                required
                value={department.name}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="supervisor">
              Supervisor:
              <select
                name="supervisor"
                id="supervisor"
                onChange={handleSupervisorChange}
                value={department.supervisor}
              >
                <option value="" disabled>
                  Select supervisor
                </option>
                {[...(employees?.data || [])]
                  .sort((a, b) => a.firstName.localeCompare(b.firstName))
                  .map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div className="mx-auto flex flex-col sm:flex-row gap-4">
            <button type="submit" className="button w-[150px]">
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="button w-[150px]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDepartment;
