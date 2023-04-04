"use client";
import { createContext, useState, useEffect } from "react";
import destr from "destr";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
// import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter().push;
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const res = destr(
      window !== "undefined" && window.localStorage.getItem("user")
    );
    console.log(res);
    if (res) {
      setUser(res);
    } else {
      setUser(null);
      router("/login");
    }
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
