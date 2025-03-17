import { useAddUserMutation } from "../../../slices/userApiSlice";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import ReturnIcon from "../../../components/ReturnIcon";
import { IUser } from "../../../definitions";
import { useGetDepartmentsQuery } from "../../../slices/departmentApiSlice";

const AddEmployee = () => {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();
  const { data: departments } = useGetDepartmentsQuery();
  const [profile, setProfile] = useState<Partial<IUser>>({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    department: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepartmentId = e.target.value;
    const selectedDepartment = departments?.data.find(
      (department) => department._id === selectedDepartmentId
    );

    if (selectedDepartment) {
      setProfile((prev) => ({
        ...prev,
        department: selectedDepartmentId,
        position: "",
      }));
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;
    const department = formData.get("department") as string;

    const data = { firstName, lastName, email, position, department };
    const res = await addUser({ data });

    if (res.data?.success) {
      navigate("/admin/employees");
    }
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <ReturnIcon />
        <h1 className="">Add New Employee.</h1>
      </div>
      <div className="bg-white  w-full h-[90%] p-4 flex flex-col gap-4 rounded-lg md:w-[90%] ">
        <p className="text-lg ">
          Fill in the form below to add a new employee to the system. Ensure all
          details are accurate before submitting.
        </p>
        <div className="w-full h-[90%] my-4 flex flex-col gap-4 rounded-lg lg:w-[95%]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label htmlFor="firstName">
                First Name:
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  value={profile.firstName}
                  onChange={handleChange}
                  maxLength={100}
                />
              </label>

              <label htmlFor="lastName">
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  value={profile.lastName}
                  onChange={handleChange}
                  maxLength={100}
                />
              </label>

              <label htmlFor="email">
                Email Address:
                <input
                  type="email"
                  required
                  name="email"
                  id="email"
                  value={profile.email}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="department">
                Departments:
                <select
                  name="department"
                  id="department"
                  onChange={handleDepartmentChange}
                  value={profile.department}
                >
                  <option value="" disabled>
                    Select a department
                  </option>
                  {departments?.data.map((department) => (
                    <option key={department._id} value={department._id}>
                      {department.name}
                    </option>
                  ))}
                </select>
              </label>

              <label htmlFor="position">
                Position:
                <select
                  name="position"
                  id="position"
                  value={profile.position}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a position
                  </option>
                  {departments?.data
                    .find((dept) => dept._id === profile.department)
                    ?.positions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <button type="submit" className="button w-[150px] mx-auto">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
