import { Link } from "react-router";
import { useGetDepartmentQuery } from "../slices/departmentApiSlice";
import { useGetUserQuery } from "../slices/userApiSlice";

type Props = {
  firstName: string;
  lastName: string;
  position: string;
  image?: string;
  id: string;
};

const EmployeeCard = ({ firstName, lastName, position, id }: Props) => {
  const { data: employee } = useGetUserQuery(id);
  const { data: department } = useGetDepartmentQuery({
    id: String(employee?.data.department),
  });
  return (
    <Link
      to={`/admin/employees/${id}`}
      className="h-[360px] max-w-[340px] w-full  rounded-lg bg-white justify-self-center hover:scale-[1.01]"
    >
      <img
        className="h-[60%] object-center object-cover w-full rounded-tl-lg rounded-tr-lg"
        src="/default-user.jpg"
        alt=""
      />
      <div className="px-4 py-4">
        <h3 className="font-bold">
          {firstName && lastName
            ? `${firstName} ${lastName}`
            : "Name is missing"}
          .
        </h3>
        <p>{position ? position : "No positon provided"}</p>
        <p>{department?.success ? department.data.name : "Not Available"}.</p>
      </div>
    </Link>
  );
};

export default EmployeeCard;
