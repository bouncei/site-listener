"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai";
import { ActiveLink, Button } from "../elements";
import AuthContext from "../../context/Auth";
import { useContext, useMemo } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavProps {
  onClose: any;
}

const SideNav = ({ onClose }: NavProps) => {
  const router = useRouter().push;
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    router("/login");
    toast.success("Bye, see you later 👋");
  };

  return (
    <Box
      sx={{
        width: { xs: 200, sm: 300, md: 400 },
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
        color: "white",
      }}
      role="presentation"
      className="filter flex-col bg-slate-800 bg-opacity-90"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <div className="py-8 px-3">
        <div className="flex justify-between items-center">
          <div></div>
          <div className="flex items-center space-x-3">
            <AiOutlineClose onClick={onClose} size={20} />
          </div>
        </div>

        <div className="py-8 flex flex-col justify-center items-center gap-4">
          <ActiveLink href="/">
            <button className=" text-sm hover:bg-[#1890ff] py-1 px-3 rounded-lg duration-200 ease-in-out">
              User Access
            </button>
          </ActiveLink>

          <ActiveLink href="/dashboard">
            <button className="text-sm hover:bg-[#1890ff] py-1 px-3 rounded-lg duration-200 ease-in-out">
              Dashboard
            </button>
          </ActiveLink>

          <br />

          {!user ? (
            <Link className="hidden md:inline-block" href="/login">
              <Button>Sign In</Button>
            </Link>
          ) : (
            <div className="hidden md:inline-block" onClick={handleLogout}>
              <Button>Logout</Button>
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default SideNav;
