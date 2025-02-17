import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";

const ReturnIcon = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className="bg-secondary w-fit p-2 rounded-lg"
    >
      <IoArrowBack className="text-4xl text-background" />
    </div>
  );
};

export default ReturnIcon;
