import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FaUserGraduate } from "react-icons/fa";
import { GrFingerPrint } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import { TbBriefcase2 } from "react-icons/tb";
import { Link } from "react-router";
import Icon from "../../components/Icon";
import { useGetUserProfileQuery } from "../../slices/userApiSlice";
import { useGetDepartmentQuery } from "../../slices/departmentApiSlice";

const Dashboard = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data } = useGetUserProfileQuery({ id: userInfo?._id || "" });
  const { data: department } = useGetDepartmentQuery({
    id: data?.data.department || "",
  });

  console.log("department  ", department);

  const firstName = data?.data.firstName || "";
  const lastName = data?.data.lastName || "";
  const email = data?.data.email || "";
  const position = data?.data.position || "";
  const supervisor = department?.data.supervisor?.name || "Not Available";

  return (
    <>
      <h1>Dashboard Overview.</h1>

      <div className="flex flex-col gap-2">
        <h2>
          {firstName} {lastName}.
        </h2>
        <h3>{position}.</h3>
        <p>{email}.</p>
        <p>Department: {department?.data.name}.</p>
        <p>Supervisor: {supervisor}.</p>
      </div>
      <div className="">
        <p>Documents:</p>
        <div className=" grid sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <Link to="/files/CV">
            <Icon
              label={"Certified I.D Copy"}
              icon={<GrFingerPrint className="sidebar-icons text-secondary" />}
            />
          </Link>
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
    </>
  );
};
export default Dashboard;
