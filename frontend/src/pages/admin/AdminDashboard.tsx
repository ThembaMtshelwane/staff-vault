import { GrGroup } from "react-icons/gr";
import { PiTreeStructureLight } from "react-icons/pi";
import TagAndStat from "../../components/TagAndStat";
import { useGetOrganizationByAdminQuery } from "../../slices/organizationSlice";
import { useState, useEffect } from "react";
import { useGetFilteredUsersQuery } from "../../slices/userApiSlice";
import { useGetDepartmentsQuery } from "../../slices/departmentApiSlice";

const AdminDashboard = () => {
  const { data } = useGetOrganizationByAdminQuery("admin@staffvault.co.za");
  const { data: departments } = useGetDepartmentsQuery();
  const { data: employees } = useGetFilteredUsersQuery({
    page: 1,
    search: "",
    department: "",
  });

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
        <h3 className="font-bold">
          {profile.name || "No company name provided"}.
        </h3>

        <div className="underline flex flex-col md:flex-row gap-2 md:gap-4">
          <p>{profile.email || "No email provided"} </p>
          <p>{profile.phone || "No phone number provided"} </p>
        </div>

        <p className="text-justify">
          {profile.description || "No company description given"}
        </p>
      </div>

      <div className=" flex flex-col gap-4 sm:flex-row ">
        <TagAndStat
          name={"Total Employees"}
          stat={employees?.pagination.totalDocuments || 0}
          icon={<GrGroup className="sidebar-icons" />}
          link={"/admin/employees"}
        />
        <TagAndStat
          name={"Total Departments"}
          stat={departments?.data.length || 0}
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
