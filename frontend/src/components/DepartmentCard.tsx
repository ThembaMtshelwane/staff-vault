import { Link } from "react-router";

type Props = {
  name: string;
  image?: string;
  id: string;
  superviour: string;
  email: string;
  staff: number;
};

const DepartmentCard = ({
  name = "Not Available",
  image = "department-default-imade.png",
  id,
  staff,
  superviour = "Not Available",
}: Props) => {
  return (
    <Link
      to={`${id}`}
      className="h-[360px] w-[280px] md:max-w-[340px] md:w-full rounded-lg bg-white justify-self-center hover:scale-[1.01]"
    >
      <img
        className="h-[60%] object-center object-cover w-full rounded-tl-lg rounded-tr-lg"
        src={`/${image}`}
        alt=""
      />
      <div className="px-4 py-4">
        <h3 className="font-bold">{name}</h3>
        <p>{superviour}</p>
        <p>Total employees: {staff}</p>
      </div>
    </Link>
  );
};

export default DepartmentCard;
