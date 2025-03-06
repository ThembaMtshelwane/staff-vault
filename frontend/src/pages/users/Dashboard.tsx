import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FaUserGraduate } from "react-icons/fa";
import { GrFingerPrint } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import { TbBriefcase2 } from "react-icons/tb";
import { Link } from "react-router";
import Icon from "../../components/Icon";
import { useGetDepartmentQuery } from "../../slices/departmentApiSlice";
import { useGetUserQuery } from "../../slices/userApiSlice";

const Dashboard = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data: department } = useGetDepartmentQuery({
    id: userInfo?.department || "",
  });
  const { data: supervisor } = useGetUserQuery(userInfo?.supervisor || "");

  const firstName = userInfo?.firstName || "";
  const lastName = userInfo?.lastName || "";
  const email = userInfo?.email || "";
  const position = userInfo?.position || "";
  const supervisorFirstName = supervisor?.data.firstName;
  const supervisorLastName = supervisor?.data.lastName;

  return (
    <>
      <h1>Dashboard Overview.</h1>

      <div className="flex flex-col gap-2">
        <h2>
          {firstName} {lastName}.
        </h2>
        <h3>{position}.</h3>
        <p>{email}.</p>
        <p>Department: {department?.data.name || "Not Available"}.</p>
        <p>
          Supervisor:{" "}
          {userInfo?.supervisor
            ? `${supervisorFirstName} ${supervisorLastName}`
            : "Not Available"}
          .
        </p>
      </div>
      <div className="">
        <p>Documents:</p>
        <div className=" grid sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <Link to="/files/certified-id">
            <Icon
              label={"Certified I.D Copy"}
              icon={<GrFingerPrint className="sidebar-icons text-secondary" />}
            />
          </Link>
          <Link to="/files/cv">
            <Icon
              label={"CV"}
              icon={<TbBriefcase2 className="sidebar-icons text-secondary" />}
            />
          </Link>
          <Link to="/files/qualifications">
            <Icon
              label={"Qualifications"}
              icon={<FaUserGraduate className="sidebar-icons text-secondary" />}
            />
          </Link>
          <Link to="/files/others">
            <Icon
              label={"Certified I.D Copy"}
              icon={<IoIosMore className="sidebar-icons text-secondary" />}
            />
          </Link>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
