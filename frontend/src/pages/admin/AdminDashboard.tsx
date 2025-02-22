import { GrGroup } from "react-icons/gr";
import { PiTreeStructureLight } from "react-icons/pi";
import TagAndStat from "../../components/TagAndStat";
import { useGetOrganizationByAdminQuery } from "../../slices/organizationSlice";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data } = useGetOrganizationByAdminQuery(userInfo?.email || "");

  const [profile, setProfile] = useState({
    id: "",
    name: "",
    description: "",
    email: "",
    phone: "",
    address: "",
    reference: "",
  });
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
      <h1 className="">Dashboard Overview.</h1>

      <div className="flex flex-col gap-4 max-w-[640px]">
        <h3 className="font-bold">{profile.name}.</h3>

        <div className="underline flex flex-col md:flex-row gap-2 md:gap-4">
          <p>{profile.email}</p>
          <p>{profile.phone} </p>
        </div>

        <p className="text-justify">{profile.description}</p>
      </div>

      <div className=" flex flex-col gap-4 sm:flex-row ">
        <TagAndStat
          name={"Total Employees"}
          stat={320}
          icon={<GrGroup className="sidebar-icons" />}
          link={"/admin/employees"}
        />
        <TagAndStat
          name={"Total Departments"}
          stat={8}
          icon={
            <PiTreeStructureLight className="sidebar-icons rotate-90 font-extrabold" />
          }
          link={"/admin/departments"}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
