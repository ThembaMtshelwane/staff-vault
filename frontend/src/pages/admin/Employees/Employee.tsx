import { useParams, useNavigate } from "react-router";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../../slices/userApiSlice";
import { GrFingerPrint } from "react-icons/gr";
import { TbBriefcase2 } from "react-icons/tb";
import { FaUserGraduate } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import ReturnIcon from "../../../components/ReturnIcon";
import { useGetDepartmentQuery } from "../../../slices/departmentApiSlice";

const Employee = () => {
  const { id } = useParams<{ id: string }>();
  const { data: employee } = useGetUserQuery(String(id));
  const { data: supervisor } = useGetUserQuery(
    String(employee?.data.supervisor)
  );
  const { data: departmentData } = useGetDepartmentQuery({
    id: employee?.data.department || "",
  });
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const firstName = employee?.data?.firstName || "N/A";
  const lastName = employee?.data?.lastName || "N/A";
  const position = employee?.data?.position || "Not Available";
  const department = departmentData?.data?.name || "Not Available";
  const supervisorFirstName = supervisor?.data.firstName || "Not Available";
  const supervisorLastName = supervisor?.data.lastName || "Not Available";
  const email = employee?.data?.email || "Not Available";

  const handleDeleteEmployee = async () => {
    const res = await deleteUser(String(id));
    console.log(res);

    if (res.data?.success) {
      navigate("/admin/employees");
      return;
    }
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <ReturnIcon />
        <h1 className="">Employee.</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-bold">
            {firstName === "N/A" || lastName === "N/A"
              ? "Not Available"
              : `${firstName} ${lastName}`}
            .
          </h3>
        </div>

        <p>Email: {email}. </p>
        <p>Position: {position}. </p>
        <p>Dpeartment: {department}. </p>
        <p>
          Supervisor:{" "}
          {supervisor?.data
            ? `${supervisorFirstName} ${supervisorLastName}`
            : "Not Available"}
          .{" "}
        </p>

        <div className="">
          <p>Documents:</p>
          <div className=" grid sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
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

        {employee?.data.role !== "admin" && (
          <div className=" flex justify-center gap-4">
            {/* <button className="button w-[150px]">Edit</button> */}
            <button onClick={handleDeleteEmployee} className="button w-[150px]">
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Employee;
