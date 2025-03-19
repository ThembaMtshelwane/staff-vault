import ReturnIcon from "../components/ReturnIcon";
import { TiWarning } from "react-icons/ti";
const NotFound = () => {
  return (
    <section className="bg-background h-screen relative text-general overflow-y-hidden max-w-[3072px] mx-auto">
      <section className="py-4 px-8 overflow-y-scroll relative flex flex-col gap-4 md:w-[75%] mx-auto border h-full items-center justify-center ">
        <p className="text-3xl font-extrabold">404 Sorry 404</p>
        <TiWarning className="text-secondary text-9xl" />
        <p className="text-5xl text-center font-extrabold text-primary">
          Page Not Found!
        </p>
        <div className="flex items-center gap-2 text-secondary">
          <ReturnIcon /> Go Back
        </div>
      </section>
    </section>
  );
};

export default NotFound;
