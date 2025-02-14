import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router";

const AddEmployee = () => {
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
        <form className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label htmlFor="firstName">
              First Name:
              <input type="text" required />
            </label>
            <label htmlFor="lastName">
              Last Name:
              <input type="text" required />
            </label>
            <label htmlFor="emailAddress">
              Work Email Address:
              <input type="email" required />
            </label>
            <label htmlFor="staffID">
              Staff ID:
              <input type="text" required />
            </label>
            <label htmlFor="position">
              Position:
              <input type="text" required />
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
