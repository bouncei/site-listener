"use client"; // this is a client component
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
// import Image from "next/image";
import LoadingIcon from "../../components/elements/Loading";
import Link from "next/link";

const styles = {
  input:
    "w-full rounded-md p-2 px-4 focus:border focus:border-amber-600 bg-[#e7ebf0]",
};
const Login = () => {
  const router = useRouter().push;
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(true);
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (event: any) => {
    const { value, name } = event.target;

    if (name === "email") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.userName == "" || formData.password == "") {
        toast.error("Please enter all fields");
      } else {
        const res = await fetch(
          `/api/auth?username=${formData.userName}&password=${formData.password}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const response = await res.json();

        toast.success(response.message);

        if (response.user) {
          window.localStorage.setItem("user", JSON.stringify(response.user));
          router("/");
        }

        setLoading(false);
        setFormData({
          userName: "",
          password: "",
        });
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };
  return (
    <div className="bg-slate-700 h-screen">
      <div className="flex min-h-[calc(100vh - 7px)] py-[79px] flex-col">
        <div className="flex flex-col items-center flex-1">
          <div className="md:w-1/2 lg:w-1/3 bg-slate-800 rounded-xl p-10 flex-col m-auto justify-center space-y-5">
            <p className="text-center text-xl md:text-3xl font-medium text-white font-serif mb-10">
              Admin Login
            </p>

            <form
              onSubmit={(e: any) => handleSubmit(e)}
              className="flex flex-col m-auto justify-center space-y-5 max-w-[600px]"
            >
              <input
                type="text"
                name="userName"
                value={formData["userName"]}
                className={styles.input}
                placeholder="Username"
                autoCorrect="off"
                onChange={handleChange}
                required
              />
              <div className="flex items-center relative">
                <input
                  type={hide ? "password" : "text"}
                  className={styles.input}
                  value={formData["password"]}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  required
                />
                <span
                  className="absolute text-sm cursor-pointer rounded p-1 right-3"
                  onClick={() => setHide(!hide)}
                >
                  {hide ? "show" : "hide"}
                </span>
              </div>

              <button
                disabled={loading}
                className="bg-[#1890ff]  font-semibold py-2 px-3 rounded-lg duration-200 ease-in-out text-white hover:text-[#1890ff]  hover:bg-white w-full"
              >
                {loading ? <LoadingIcon /> : "Log in"}
              </button>
              {/*
              
              <div className="flex items-right justify-end space-x-2 text-white">
                <p>Don&apos;t have an account?</p>
                <span className="text-[#1890ff]">
                  <Link href="/register">Sign up</Link>
                </span>
              </div>
              */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
