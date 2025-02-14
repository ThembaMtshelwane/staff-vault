import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router";
// import { useGetUserQuery } from "../../../slices/userApiSlice";
import { GrFingerPrint } from "react-icons/gr";
import { TbBriefcase2 } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";

const Employee = () => {
  // const { id } = useParams<{ id: string }>();
  // const { data: employee } = useGetUserQuery({ id: id ?? "" });

  return (
    <>
      <div className="flex items-center gap-2">
        <Link
          to="/admin/employees"
          className="bg-secondary w-fit p-2 rounded-lg"
        >
          <IoArrowBack className="text-4xl text-background" />
        </Link>
        <h1 className="">Employee.</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-bold">Themba Mtshelwane.</h3>
          <p>Software Developer Intern.</p>
        </div>

        <p>Dpeartment: Software Developer Academy. </p>
        <p>Supervisor: Katlego Molala. </p>
        <p>Location: 2nd Floor.</p>

        <div className="">
          <p>Documents:</p>
          <div className=" grid grid-cols-4 p-4 gap-4">
            <div
              className="border border-secondary flex flex-col items-center justify-center px-4 py-8 rounded-lg gap-4 cursor-pointer hover:scale-102
            "
            >
              <GrFingerPrint className="sidebar-icons text-secondary" />
              <p>Certified ID Copy.</p>
            </div>
            <div
              className="border border-secondary flex flex-col items-center justify-center px-4 py-8 rounded-lg gap-4 cursor-pointer hover:scale-102
            "
            >
              <TbBriefcase2 className="sidebar-icons text-secondary" />
              <p>C.V.</p>
            </div>
            <div
              className="border border-secondary flex flex-col items-center justify-center px-4 py-8 rounded-lg gap-4 cursor-pointer hover:scale-102
            "
            >
              <FaUserGraduate className="sidebar-icons text-secondary" />
              <p>Qualifications</p>
            </div>
            <div
              className="border border-secondary flex flex-col items-center justify-center px-4 py-8 rounded-lg gap-4 cursor-pointer hover:scale-102
            "
            >
              <IoIosMore className="sidebar-icons text-secondary" />
              <p>Others.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
