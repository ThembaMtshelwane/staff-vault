import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router";
import { useAddUserMutation } from "../../../slices/userApiSlice";
import { FormEvent } from "react";
import { useNavigate } from "react-router";

const AddEmployee = () => {
  const [addUser] = useAddUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;

    const data = { firstName, lastName, email, position };

    console.log(data);

    const res = await addUser({ data });

    if (res.data?.success) {
      navigate("/admin/employees");
    }
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <Link
          to="/admin/employees"
          className="bg-secondary w-fit p-2 rounded-lg"
        >
          <IoArrowBack className="text-4xl text-background" />
        </Link>
        <h1 className="">Add New Employee.</h1>
      </div>
      <div className="bg-white  w-full h-[90%] p-4 flex flex-col gap-4 rounded-lg md:w-[90%] ">
        <p className="text-lg ">
          Fill in the form below to add a new employee to the system. Ensure all
          details are accurate before submitting.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="firstName">
              First Name:
              <input type="text" name="firstName" id="firstName" required />
            </label>
            <label htmlFor="lastName">
              Last Name:
              <input type="text" required name="lastName" id="lastName" />
            </label>
            <label htmlFor="email">
              Work Email Address:
              <input type="email" required name="email" id="email" />
            </label>
            <label htmlFor="staffID">
              Staff ID:
              <input type="text" required name="staffID" id="staffID" />
            </label>
            <label htmlFor="position">
              Position:
              <input type="text" required name="position" id="position" />
            </label>
          </div>

          <button type="submit" className="button md:w-fit mx-auto">
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEmployee;
