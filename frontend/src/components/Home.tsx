const Home = () => {
  return (
    <section className="bg-background min-h-screen ">
      <div className="relative border h-[85vh] flex flex-col justify-center items-center gap-2 text-background bg-[url(hero-background.jpg)] bg-cover bg-center opacity-90">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.4)] via-[50%] to-background to-[90%]"></div>
        <h1 className="border text-center relative z-10">
          Safe, Secure and Centralized Hub.
        </h1>
        <h3 className="border text-center w-[75vw] relative z-10">
          A streamlined staff management system designed for efficiency and
          security.
        </h3>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <h2>Efficiently manage your staff's information.</h2>
        <ul className="bg-[#3a53763b] p-4 rounded-lg flex flex-col gap-2">
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
      </div>
      <div className="p-4 flex flex-wrap gap-4 items-center justify-center">
        <div className="bg-secondary text-background w-[180px] text-center px-4 py-2 rounded-lg">
          Manage Employees
        </div>
        <div className="bg-secondary text-background w-[180px] text-center px-4 py-2 rounded-lg">
          Time-Saving
        </div>
        <div className="bg-secondary text-background w-[180px] text-center px-4 py-2 rounded-lg">
          Scalable
        </div>
        <div className="bg-secondary text-background w-[180px]  text-center px-4 py-2 rounded-lg">
          Secure Documents
        </div>
        <div className="bg-secondary text-background w-[180px] text-center px-4 py-2 rounded-lg">
          Access Anywhere
        </div>
      </div>
      <div className=" bg-secondary flex flex-col items-center text-background px-4 py-10 gap-2 ">
        <h2>Get in touch.</h2>
        <p>
          Contact us to learn more about how we can help you manage your staff
          more efficiently.
        </p>
        <div className="flex gap-4 mt-4 w-full justify-between">
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
          <ul className="flex flex-col gap-2 w-[30vw]">
            <a href="">Facebook</a>
            <a href="">Twitter</a>
            <a href="">Instagram</a>
            <a href="">LikendIn</a>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Home;
