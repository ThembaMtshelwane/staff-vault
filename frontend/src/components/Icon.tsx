import { JSX } from "react";

type Props = {
  label: string;
  icon: JSX.Element;
};

const Icon = ({ label, icon }: Props) => {
  return (
    <div
      className="border border-secondary flex flex-col items-center justify-center px-4 py-8 rounded-lg gap-4 cursor-pointer hover:scale-102
                "
    >
      {icon}
      <p>{label}</p>
    </div>
  );
};

export default Icon;
