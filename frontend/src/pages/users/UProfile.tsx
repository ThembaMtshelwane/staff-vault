import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
import { IUser } from "../../definitions";
import { useGetDepartmentFilterQuery } from "../../slices/departmentApiSlice";
import { setCredentials } from "../../slices/authSlice";

const UProfile = () => {
  const [edit, setEdit] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateUser] = useUpdateUserMutation();
  const { data } = useGetUserProfileQuery({ id: userInfo?._id || "" });
  const { data: departments } = useGetDepartmentFilterQuery();
  // const [departmentSupervisor, setDepartmentSupervisor] = useState<string>("");
  const [profile, setProfile] = useState<Partial<IUser>>({
    _id: data?.data._id || "",
    firstName: data?.data.firstName || "",
    lastName: data?.data.lastName || "",
    email: data?.data.email || "",
    position: data?.data.position || "",
    department: data?.data.department,
  });
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (data?.data) {
      setProfile({
        _id: data?.data._id || "",
        firstName: data?.data.firstName || "",
        lastName: data?.data.lastName || "",
        email: data?.data.email || "",
        position: data?.data.position || "",
        department: data?.data.department,
      });
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateUser({ id: profile._id || "", data: profile });
    console.log("res  ", res);

    if (res.data?.success) {
      setEdit(false);
    }
    dispatch(setCredentials({ ...(res.data?.data as IUser) }));
  };

  const handleCancel = () => {
    setEdit(false);
    setProfile({
      _id: data?.data._id || "",
      firstName: data?.data.firstName || "",
      lastName: data?.data.lastName || "",
      email: data?.data.email || "",
      position: data?.data.position || "",
      department: data?.data.department,
    });
  };

  return (
    <>
      <h1>Profile</h1>
      <div className="lg:flex items-center justify-between lg:w-[95%]">
        <div className="flex gap-4 justify-center my-2">
          <button onClick={() => setEdit(true)} className="button w-[150px]">
            Edit
          </button>
        </div>
      </div>

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
                disabled={!edit}
                value={profile.firstName}
                onChange={handleChange}
                className={`${edit && "shadow-secondary shadow-lg"}`}
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
                disabled={!edit}
                value={profile.lastName}
                onChange={handleChange}
                className={`${edit && "shadow-secondary shadow-lg"}`}
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
                disabled={!edit}
                className={`${edit && "shadow-secondary shadow-lg"}`}
                value={profile.email}
                onChange={handleChange}
              />
            </label>

            <label htmlFor="department">
              Departments:
              <select
                name="department"
                id="department"
                className={`${edit && "shadow-secondary shadow-lg"}`}
                onChange={handleDepartmentChange}
                disabled={!edit}
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
                className={`${edit && "shadow-secondary shadow-lg"}`}
                disabled={!edit}
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

            {/* <label htmlFor="supervisor">
              Supervisor:
              <input
                type="text"
                name="supervisor"
                id="supervisor"
                value={departmentSupervisor}
                disabled
              />
            </label> */}
          </div>

          {edit && (
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
          )}
        </form>
      </div>
    </>
  );
};

export default UProfile;
