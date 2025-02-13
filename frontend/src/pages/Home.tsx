import HomeNavbar from "../components/HomeNavbar";

const Home = () => {
  return (
    <section className="bg-background min-h-screen relative flex flex-col ">
      <HomeNavbar />
      <div className="relative h-[75vh]  bg-[url(hero-background.jpg)] bg-cover bg-center opacity-90">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.4)]  via-[60%] to-background to-[95%] -z-10 "></div>

        <section
          id="hero"
          className="p-4 flex flex-col gap-2 items-center justify-center h-[70vh] text-background max-w-[700px] mx-auto  md:max-w-[1040px]"
        >
          <h1 className=" text-center relative md:text-7xl">
            Safe, Secure and Centralized Hub.
          </h1>
          <h3 className=" text-center w-[75%] relative md:text-3xl">
            A streamlined staff management system designed for efficiency and
            security.
          </h3>
        </section>
      </div>
      <div className="p-4 flex flex-col gap-4  mx-auto  max-w-[600px] md:grid md:max-w-[1040px] md:grid-cols-12 ">
        <h2 id="about" className="md:text-4xl md:row-[1/3] md:col-[1/8] ">
          Efficiently manage your staff's information.
        </h2>
        <ul className="bg-[#3a53763b] p-4 rounded-lg flex flex-col gap-2 md:row-[2/6] md:col-[1/7] md:justify-around">
          <li>
            <span className="font-bold">Staff Database:</span> Store and
            organize your staff's details securely in one place.
          </li>
          <li>
            <span className="font-bold">Document Vault:</span> Keep all
            staff-related files safe and accessible.
          </li>
          <li>
            <span className="font-bold">Role-Based Access:</span> Control who
            has access to what.
          </li>
          <li>
            <span className="font-bold">Cloud-Based:</span> Manage your
            workforce from anywhere.
          </li>
          <li>
            <span className="font-bold">Simple & Modern UI:</span> Designed for
            ease of use.
          </li>
        </ul>
        <img
          src="about-image.jpg"
          className="hidden md:block object-center object-cover rounded-lg h-[70vh] mt-10 w-full md:row-[1/6] md:col-[7/13]"
          alt=""
        />
      </div>
      <div className="p-4 flex flex-wrap gap-4 items-center justify-center mx-auto max-w-[800px]  md:gap-10 md:max-w-[1040px]">
        <div className="bg-secondary text-background w-[180px] text-center px-4 py-2 rounded-lg  md:text-xl md:w-[240px]">
          Manage Employees
        </div>
        <div className="bg-secondary text-background w-[180px] text-center px-4 py-2 rounded-lg md:text-xl md:w-[240px]">
          Time-Saving
        </div>
        <div className="bg-secondary text-background w-[180px] text-center px-4 py-2 rounded-lg md:text-xl md:w-[240px]">
          Scalable
        </div>
        <div className="bg-secondary text-background w-[180px]  text-center px-4 py-2 rounded-lg md:text-xl md:w-[240px]">
          Secure Documents
        </div>
        <div className="bg-secondary text-background w-[180px] text-center px-4 py-2 rounded-lg md:text-xl md:w-[240px]">
          Access Anywhere
        </div>
      </div>
      <div
        id="contact"
        className=" bg-secondary flex flex-col items-center justify-center text-background px-4 py-10 gap-2 mt-10   "
      >
        <h2>Get in touch.</h2>
        <p className=" max-w-[600px]  ">
          Contact us to learn more about how we can help you manage your staff
          more efficiently.
        </p>
        <div className="flex gap-4 mt-4 w-[80%] justify-between max-w-[600px] mx-auto  md:max-w-[1040px]">
          <ul className="flex flex-col gap-2">
            <li>
              <span>Email: </span>
              <span>thembamm3@gmail.com</span>
            </li>
            <li>
              <span>Phone: </span>
              <span>084 480 4140</span>
            </li>
          </ul>
          <ul className="flex flex-col gap-2 w-[30%]  md:flex-row md:gap-4 flex-wrap ">
            <a href="">Facebook</a>
            <a href="">Twitter</a>
            <a href="">Instagram</a>
            <a href="">LikendIn</a>
          </ul>
        </div>
        <a
          className="absolute bottom-0 text-sm opacity-45"
          href="https://github.com/ThembaMtshelwane"
          target="_blank"
        >
          ThembaMM3 <span>&#169;</span>2025
        </a>
      </div>
    </section>
  );
};

export default Home;
