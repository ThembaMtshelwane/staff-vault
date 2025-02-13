import { GrGroup } from "react-icons/gr";
import { PiTreeStructureLight } from "react-icons/pi";
import TagAndStat from "../../components/TagAndStat";

const AdminDashboard = () => {
  return (
    // <section className=" min-h-full flex flex-col gap-4 sm:px-8 border">
    <>
      <h1 className="">Dashboard Overview.</h1>

      <div className="flex flex-col gap-4 max-w-[640px]">
        <h3 className="font-bold">
          Tshimologong - Digital Innovation Precinct.
        </h3>

        <div className="underline flex flex-col gap-2">
          <p>community@tshimologong.joburg</p>
          <p>0117178156 </p>
        </div>

        <p className="text-justify">
          The University of the Witwatersrand’s B-BBBEE Level 1 Entity,
          Tshimologong Digital Innovation Precinct, is a hub where the
          incubation of startups and SMEs takes place and aims to create
          world-leading African digital entrepreneurs.We provide startups and
          entrepreneurs with the tools and support they need to grow and scale
          their businesses through our industry-leading Enterprise Development
          Model that is focused on developing skills for the digital economy
          while unearthing digital start-ups and talent in Africa.
        </p>
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
    // </section>
  );
};

export default AdminDashboard;
