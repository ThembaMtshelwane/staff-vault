import { FormEvent } from "react";
import ReturnIcon from "../../../components/ReturnIcon";
import { useNavigate } from "react-router";
import { useCreateDepartmentMutation } from "../../../slices/departmentApiSlice";

const AddDepartment = () => {
  const [createDepartment] = useCreateDepartmentMutation();
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const supervisor = formData.get("supervisor") as string;
    const email = formData.get("email") as string;

    const res = await createDepartment({ name, supervisor, email });

    if (res.data?.success) {
      navigate("/admin/departments");
    }
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <ReturnIcon />
        <h1 className="">Add New Department.</h1>
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
              <input type="text" name="name" id="name" required />
            </label>
            <label htmlFor="supervisor">
              Supervisor:
              <input type="text" required name="supervisor" id="supervisor" />
            </label>
            <label htmlFor="email">
              Supervisor's Email Address:
              <input type="email" required name="email" id="email" />
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

export default AddDepartment;
