import { FormEvent, useState } from "react";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const description = formData.get("description") as string;

    const data = { name, phone, email, description };

    console.log(data);
    setEdit(false);
  };
  return (
    <>
      <h1>Profile.</h1>
      <div>
        <h3>Themba Mtshlwane.</h3>
        <p>admin@staffvault.com</p>
      </div>
      <div className="lg:flex items-center justify-between lg:w-[90%]">
        <h2>Tshimologong - Digital Innovation Precinct.</h2>
        <div className="flex  gap-4 justify-center my-2">
          <button onClick={() => setEdit(true)} className="button w-[150px]">
            Edit
          </button>
          <button className="button w-[150px]">Delete</button>
        </div>
      </div>
      <div className="w-full h-[90%] p-4 flex flex-col gap-4 rounded-lg lg:w-[90%]">
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
                value="Tshimologong"
                className={`${edit && "shadow-secondary shadow-lg"}`}
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
                value="2024/123456/07"
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
                onClick={() => setEdit(false)}
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
