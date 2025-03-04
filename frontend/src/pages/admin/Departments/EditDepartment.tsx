import { useNavigate, useParams } from "react-router";
import ReturnHeader from "../../../components/ReturnHeader";
import {
  useGetDepartmentQuery,
  useUpdateDepartmentMutation,
} from "../../../slices/departmentApiSlice";
import { FormEvent, useEffect, useState } from "react";
import { IDepartment } from "../../../definitions";
import { useGetUsersFilterQuery } from "../../../slices/userApiSlice";

const EditDepartment = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading: departmentLoading } = useGetDepartmentQuery({
    id: String(id),
  });
  const { data: employees, isLoading: employeesLoading } =
    useGetUsersFilterQuery();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [department, setDepartment] = useState<Partial<IDepartment>>({
    name: "",
    positions: [],
    supervisor: "",
  });

  useEffect(() => {
    if (data) {
      setDepartment({
        name: data?.data.name || "",
        positions: data?.data?.positions || [],
        supervisor: data?.data?.supervisor || "",
      });
    }
  }, [data]);

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
    setEdit(false);
    setDepartment({
      name: data?.data.name || "",
      positions: data?.data?.positions || [],
      supervisor: data?.data?.supervisor || "",
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await updateDepartment({ id: String(id), data: department });

      console.log(res);

      if (res?.data?.success) {
        setEdit(false);
        navigate("/admin/departments");
      }
    } catch (error) {
      console.error("Failed to update department:", error);
    }

    if (departmentLoading || employeesLoading) {
      return <p>Loading...</p>;
    }
  };
  return (
    <>
      <div className="flex items-start gap-2">
        <ReturnHeader header={`Edit ${department.name}`} />
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
                className={`${edit && "shadow-secondary shadow-lg"}`}
                onChange={handleSupervisorChange}
                value={department.supervisor}
              >
                <option value="" disabled>
                  Select supervisor
                </option>
                {employees?.data.map((employee) => (
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

export default EditDepartment;
