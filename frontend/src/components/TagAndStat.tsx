import { ReactNode } from "react";
import { Link } from "react-router";

type Props = {
  name: string;
  stat: number;
  icon: ReactNode;
  link: string;
};

const TagAndStat = ({ name, stat, icon, link }: Props) => {
  return (
    <Link
      to={link}
      className=" flex rounded-lg w-full max-w-[300px] mx-auto sm:mx-0  "
    >
      <div className="bg-secondary p-8  rounded-tl-lg rounded-bl-lg flex items-center md:p-10">
        {icon}
      </div>
      <div className="bg-white w-full p-6 rounded-tr-lg rounded-br-lg flex flex-col justify-around items-start">
        <p>{name}.</p>
        <p className="text-xl font-bold">{stat}</p>
      </div>
    </Link>
  );
};

export default TagAndStat;
