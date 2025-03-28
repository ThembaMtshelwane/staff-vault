import { FormEvent, useEffect } from "react";
import { useLoginMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { RootState } from "../store";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin") {
        navigate("/admin/dashboard");
        return;
      }
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
        return;
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <>Loggin in data...</>;

  return (
    <section className="bg-background h-screen justify-center flex flex-col md:flex-wrap">
      <img
        src="login-image.jpg"
        alt="login-image"
        className="hidden md:block h-full w-1/2 object-center object-cover"
      />
      <div className="border-2 border-secondary w-[90%] mx-auto flex flex-col gap-4 py-8 px-8 rounded-lg max-w-[400px] md:mx-0">
        <h1 className="">Login to Staff Vault.</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label htmlFor="email">
            <p>Email:</p>
            <input type="email" name="email" id="email" required />
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <input type="password" name="password" id="password" required />
          </label>
          <button className="button">Login</button>
        </form>

        {/* <p className="text-red-400">Error messages.</p> */}
        <p className="">
          Do not have an account yet?{" "}
          <a href="/register" className="hover:scale-[2] hover:underline">
            Register.
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
