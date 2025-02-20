import { IoArrowBack, IoArrowForward } from "react-icons/io5";

type Props = {
  limit: number;
  currentPage: number;
  totalUsers: number;
  totalPages: number;

  setCurrentPage: (page: number) => void;
};

const PaginationUI = ({
  limit,
  currentPage,
  totalUsers,
  totalPages,
  setCurrentPage,
}: Props) => {
  return (
    <div className=" w-full flex justify-center items-center flex-col">
      <p>
        {limit * currentPage > totalUsers ? totalUsers : limit * currentPage}{" "}
        out of {totalUsers} employees
      </p>
      <div className="flex items-center gap-4">
        <button
          className="button"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
        >
          <IoArrowBack />
        </button>
        <input
          className="w-[60px] text-center flex items-center justify-center"
          type="number"
          value={currentPage}
          max={totalPages}
          min={1}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
        />
        of
        <div>{totalPages}</div>
        <button
          className="button"
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
          }}
        >
          <IoArrowForward />
        </button>
      </div>
    </div>
  );
};

export default PaginationUI;
