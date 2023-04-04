import React, { useState, useEffect, useContext } from "react";
import { ActiveLink, Button } from "../elements";
import { FiMenu } from "react-icons/fi";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import SideNav from "./SideNav";
import AuthContext from "../../context/Auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Link from "next/link";

const Header = () => {
  const router = useRouter().push;
  const [shadow, setShadow] = useState(false);
  const [sideNav, setSideNav] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("user");

    toast.success("Bye, see you later");
    router("/login");
  };

  return (
    <div
      className={`bg-slate-800 text-white text-sm z-10 p-3 md:px-14 md:p-6 flex w-full ${
        shadow
          ? " sticky top-0 bg-opacity-75 items-center justify-between md:justify-start rounded-none md:rounded-none"
          : " items-center justify-between md:justify-start"
      }`}
    >
      <div className="w-full md:w-1/3 flex items-center space-x-3">
        {/* <Logo /> */}
        <p className="text-lg md:text-2xl text-[#3b90e0fe] font-semibold tracking-wider ">
          Site Stats
        </p>
      </div>
      <div className="w-1/3 justify-center hidden md:flex space-x-3 items-center">
        {user && (
          <>
            <ActiveLink href="/">
              <button className=" hover:bg-[#1890ff] py-1 px-3 rounded-lg duration-200 ease-in-out">
                User Access
              </button>
            </ActiveLink>

            <ActiveLink href="/dashboard">
              <button className=" hover:bg-[#1890ff] py-1 px-3 rounded-lg duration-200 ease-in-out">
                Dashboard
              </button>
            </ActiveLink>
          </>
        )}
      </div>
      <div className="w-1/3 flex items-center justify-end pr-3 space-x-2">
        {/*Amount of Items in cart */}

        {!user ? (
          <Link className="hidden md:inline-block" href="/login">
            <Button>Sign In</Button>
          </Link>
        ) : (
          <>
            <div className="hidden md:inline-block" onClick={handleLogout}>
              <Button>Logout</Button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Nav */}
      <div
        className="flex md:hidden cursor-pointer"
        onClick={() => setSideNav(true)}
      >
        <FiMenu size={30} />
      </div>
      <SwipeableDrawer
        anchor="right"
        open={sideNav}
        onClose={() => setSideNav(false)}
        onOpen={() => setSideNav(true)}
      >
        <SideNav onClose={() => setSideNav(false)} />
      </SwipeableDrawer>
    </div>
  );
};

export default Header;
