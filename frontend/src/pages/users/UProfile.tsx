import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
} from "../../slices/userApiSlice";
import { IUser } from "../../definitions";

const UProfile = () => {
  const [edit, setEdit] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [updateUser] = useUpdateUserMutation();
  const { data } = useGetUserProfileQuery({ id: userInfo?._id || "" });

  const [profile, setProfile] = useState<Partial<IUser>>({
    _id: data?.data._id || "",
    firstName: data?.data.firstName || "",
    lastName: data?.data.lastName || "",
    email: data?.data.email || "",
    position: data?.data.position || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEdit(false);
    setProfile({
      _id: data?.data._id || "",
      firstName: data?.data.firstName || "",
      lastName: data?.data.lastName || "",
      email: data?.data.email || "",
      position: data?.data.position || "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateUser({ id: profile._id || "", data: profile });

    if (res.data?.success) {
      setEdit(false);
    }
  };

  useEffect(() => {
    setProfile({
      _id: data?.data._id || "",
      firstName: data?.data.firstName || "",
      lastName: data?.data.lastName || "",
      email: data?.data.email || "",
      position: data?.data.position || "",
    });
  }, [data]);

  return (
    <>
      <h1>Profile.</h1>
      <div className="lg:flex items-center justify-between lg:w-[95%]">
        <div className="flex  gap-4 justify-center my-2">
          <button onClick={() => setEdit(true)} className="button w-[150px]">
            Edit
          </button>
        </div>
      </div>
      <div className="w-full h-[90%] my-4 flex flex-col gap-4 rounded-lg lg:w-[95%]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="firstName">
              First name:
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
              Last name:
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
            <label htmlFor="position">
              Position:
              <input
                type="text"
                required
                name="position"
                id="position"
                disabled={!edit}
                className={`${edit && "shadow-secondary shadow-lg"}`}
                value={profile.position}
                onChange={handleChange}
              />
            </label>
          </div>

          {edit && (
            <div className="mx-auto flex flex-col sm:flex-row gap-4">
              <button type="submit" className="button w-[150px] ">
                Save
              </button>
              <button
                onClick={handleCancel}
                type="submit"
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
