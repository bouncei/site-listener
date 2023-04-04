"use client";
import React, { useEffect, useState, useContext } from "react";
import { Inter } from "next/font/google";
import { Button } from "@/components/elements";
import { AddUser } from "@/components/cards";
import AuthContext from "../context/Auth";
import TableCard from "../components/cards/TableCard";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [r, setR] = useState(false);

  const getUsers = async () => {
    const resp = await fetch("/api/users", { method: "GET" });
    const data = await resp.json();

    setData(data["data"]);
  };
  useEffect(() => {
    getUsers();
  }, [r]);

  console.log("Check layout");

  return (
    <div>
      <div className=" flex justify-end items-center">
        <div></div>
        <Button onClick={() => setOpenModal(true)}>Add User</Button>
      </div>
      {/* Render Users (Use Table) */}
      <div className="w-full shadow-xl rounded-xl">
        <div className=" py-4 px-2x  md:p-8">
          <div className="flex justify-between mb-4">
            <h2 className="test-lg md:text-2xl font-semibold text-[#3b90e0fe]">
              Admin Users
            </h2>
          </div>
          <table className="w-full  text-left table-fixed">
            <thead className="rounded-lg">
              <tr>
                <th className="text-sm font-semibold p-4 bg-slate-600 uppercase truncate text-[#3b90e0fe]">
                  Username
                </th>
                <th className="text-sm font-semibold p-4  hidden md:flex bg-slate-600 uppercase text-[#3b90e0fe] text-center">
                  Date & Time
                </th>
                <th className="text-sm font-semibold p-4 bg-slate-600 uppercase text-[#3b90e0fe] text-center">
                  Email
                </th>
                {user?.isAdmin && (
                  <>
                    <th className="text-sm font-semibold p-4 bg-slate-600 uppercase text-[#3b90e0fe] text-center">
                      Modify
                    </th>
                    <th className="text-sm font-semibold p-4 bg-slate-600 uppercase text-[#3b90e0fe] text-center">
                      Delete
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index) => (
                <TableCard
                  key={index}
                  index={index}
                  item={item}
                  user={user}
                  render={() => setR(!r)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddUser
        show={openModal}
        onClose={() => setOpenModal(!openModal)}
        render={() => setR(!r)}
      />
    </div>
  );
}
