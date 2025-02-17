import { CiFilter } from "react-icons/ci";
import { IDepartment } from "../definitions";
import { useState, useRef, useEffect } from "react";

type Props = {
  filterOptions: IDepartment[];
};

const Filter = ({ filterOptions }: Props) => {
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div className="w-[20%] text-background  flex items-center justify-around bg-secondary rounded-lg ">
      <CiFilter
        onClick={() => setToggle((prev) => !prev)}
        className="text-2xl font-extrabold h-full"
      />
      {toggle && (
        <ul
          ref={menuRef}
          className=" flex flex-col p-2 gap-2 absolute border bg-white top-0 right-0  w-[250px] h-98 overflow-y-scroll rounded-lg z-[999]"
        >
          {filterOptions?.map((option) => (
            <li
              key={option._id}
              onClick={() => {
                setToggle((prev) => !prev);
                console.log(toggle);
              }}
              className="text-secondary border px-2 py-4 hover:bg-secondary hover:text-background rounded-lg hover:scale-102 cursor-pointer"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filter;
