import { FormEvent, useEffect, useState } from "react";
import {
  useGetOrganizationByAdminQuery,
  useUpdateOrganizationMutation,
} from "../../slices/organizationSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data } = useGetOrganizationByAdminQuery(userInfo?.email || "");
  const [updateOrganization] = useUpdateOrganizationMutation();

  const [profile, setProfile] = useState({
    id: "",
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    reference: "",
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
      id: data?.data._id || "",
      name: data?.data.name || "",
      description: data?.data.description || "",
      email: data?.data.email || "",
      phone: data?.data.phone || "",
      address: data?.data.address || "",
      reference: data?.data.registrationNumber || "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateOrganization({
      id: data?.data._id || "",
      data: profile,
    });

    if (res.data?.success) {
      setEdit(false);
    }
  };

  useEffect(() => {
    setProfile({
      id: data?.data._id || "",
      name: data?.data.name || "",
      description: data?.data.description || "",
      email: data?.data.email || "",
      phone: data?.data.phone || "",
      address: data?.data.address || "",
      reference: data?.data.registrationNumber || "",
    });
  }, [data]);

  return (
    <>
      <h1>Profile.</h1>
      <div>
        <p>{userInfo?.email}</p>
      </div>
      <div className="lg:flex items-center justify-between lg:w-[95%]">
        <h2>{profile.name}.</h2>
        <div className="flex  gap-4 justify-center my-2">
          <button onClick={() => setEdit(true)} className="button w-[150px]">
            Edit
          </button>
          <button className="button w-[150px]">Delete</button>
        </div>
      </div>
      <div className="w-full h-[90%] p-4 flex flex-col gap-4 rounded-lg lg:w-[95%]">
        <p className="text-lg ">
          Fill in the form below to add a new employee to the system. Ensure all
          details are accurate before submitting.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="name">
              The name of the organization:
              <input
                type="text"
                name="name"
                id="name"
                required
                disabled={!edit}
                value={profile.name}
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
            <label htmlFor="phone">
              Phone:
              <input
                type="tel"
                required
                name="phone"
                id="phone"
                disabled={!edit}
                className={`${edit && "shadow-secondary shadow-lg"}`}
                value={profile.phone}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
              />
            </label>
            <label htmlFor="address">
              Phyiscla Address:
              <input
                type="text"
                required
                name="address"
                id="address"
                disabled={!edit}
                className={`${edit && "shadow-secondary shadow-lg"}`}
                value={profile.address}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="description" className="flex flex-col ">
              Description:
              <textarea
                className={`${
                  edit && "shadow-secondary shadow-lg"
                }  min-h-[150px] max-h-[150px]`}
                required
                name="description"
                id="description"
                disabled={!edit}
                value={profile.description}
                onChange={handleChange}
                maxLength={550}
              />
            </label>
            <label htmlFor="refNumber">
              Company reference number:
              <input
                className="cursor-not-allowed"
                type="text"
                required
                name="refNumber"
                id="refNumber"
                value={profile.reference}
                onChange={handleChange}
                disabled
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

export default Profile;
