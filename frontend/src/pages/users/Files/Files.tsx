import { FaUserGraduate } from "react-icons/fa";
import { GrFingerPrint } from "react-icons/gr";
import { IoIosMore } from "react-icons/io";
import { TbBriefcase2 } from "react-icons/tb";
import Icon from "../../../components/Icon";
import { Link } from "react-router";

const Files = () => {
  return (
    <>
      <h1>Manage Files.</h1>
      <div className="">
        <div className=" grid p-4 gap-4 sm:hidden">
          <Link to="certified-id">
            <Icon
              label={"Certified I.D Copy"}
              icon={<GrFingerPrint className="sidebar-icons text-secondary" />}
            />
          </Link>

          <Link to="cv">
            <Icon
              label={"C.V"}
              icon={<TbBriefcase2 className="sidebar-icons text-secondary" />}
            />
          </Link>

          <Link to="qualifications">
            <Icon
              label={"Qualifications"}
              icon={<FaUserGraduate className="sidebar-icons text-secondary" />}
            />
          </Link>
          <Link to="other">
            <Icon
              label={"Other"}
              icon={<IoIosMore className="sidebar-icons text-secondary" />}
            />
          </Link>
        </div>

        <div className="hidden sm:flex flex-col  gap-4 max-w-[850px]">
          <div className=" grid grid-cols-3 items-center shadow-lg rounded-lg p-4">
            <Link to="certified-id">
              <Icon
                label={"Certified I.D Copy"}
                icon={
                  <GrFingerPrint className="sidebar-icons text-secondary" />
                }
              />
            </Link>
            <p className=" text-center">Updated 3 months ago</p>
            <div className="  flex justify-around">
              <Link to="certified-id" className="button">
                Update
              </Link>
              <button className="button">Delete</button>
            </div>
          </div>

          <div className=" grid grid-cols-3 items-center shadow-lg rounded-lg p-4">
            <Link to="CV">
              <Icon
                label={"C.V"}
                icon={<TbBriefcase2 className="sidebar-icons text-secondary" />}
              />
            </Link>
            <p className=" text-center">Updated 3 months ago</p>
            <div className="  flex justify-around">
              <Link to="CV" className="button">
                Update
              </Link>
              <button className="button">Delete</button>
            </div>
          </div>
          <div className=" grid grid-cols-3 items-center shadow-lg rounded-lg p-4">
            <Link to="qualifications">
              <Icon
                label={"Qualifications"}
                icon={
                  <FaUserGraduate className="sidebar-icons text-secondary" />
                }
              />
            </Link>
            <p className=" text-center">Updated 3 months ago</p>
            <div className="  flex justify-around">
              <Link to="qualifications" className="button">
                Update
              </Link>
            </div>
          </div>
          <div className=" grid grid-cols-3 items-center shadow-lg rounded-lg p-4">
            <Link to="others">
              <Icon
                label={"Others"}
                icon={<IoIosMore className="sidebar-icons text-secondary" />}
              />
            </Link>
            <p className=" text-center">Updated 3 months ago</p>
            <div className="  flex justify-around">
              <Link to="other" className="button">
                Update
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Files;
