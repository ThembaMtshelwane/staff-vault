import { IoAddCircleOutline, IoSearch } from "react-icons/io5";
import { Link } from "react-router";
import Filter from "./Filter";
import { useGetDepartmentsQuery } from "../slices/departmentApiSlice";

type Props = {
  addFunctionName: string;
  addLink: string;
};

const ContentControls = ({ addFunctionName, addLink }: Props) => {
  const { data: departments } = useGetDepartmentsQuery();
  return (
    <div className="flex flex-col gap-2 md:flex-row justify-between">
      <Link to={addLink} className="button w-fit flex items-center px-4 gap-2">
        <IoAddCircleOutline className="text-2xl" />
        <p>Add {addFunctionName}</p>
      </Link>

      <div className=" flex gap-1 w-full md:w-[50%] max-w-[450px] relative">
        <div className="w-[80%]  flex items-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder={`Search for ${addFunctionName}`}
            className="rounded-tr-none rounded-br-none w-[80%]"
          />
          <div className="bg-secondary w-[20%] h-full text-background flex items-center justify-center rounded-tr-lg rounded-br-lg">
            <IoSearch className="text-2xl" />
          </div>
        </div>
        <Filter filterOptions={departments?.data || []} />
      </div>
    </div>
  );
};

export default ContentControls;
