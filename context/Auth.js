"use client";
import { createContext, useState, useEffect } from "react";
import destr from "destr";
import { usePathname } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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
    }
  }, [pathname]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
