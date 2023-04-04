"use client";
import { AddSite, CompanyCard } from "@/components/cards";
import { Button } from "@/components/elements";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [r, setR] = useState(false);

  const getCompanies = async () => {
    const resp = await fetch("/api/company", { method: "GET" });
    const data = await resp.json();

    setData(data["data"]);
  };
  useEffect(() => {
    getCompanies();
  }, [r]);

  setTimeout(() => getCompanies(), 1000);
  return (
    <div>
      <div className=" flex justify-end items-center">
        <div></div>
        <Button onClick={() => setOpenModal(true)}>Add Website</Button>
      </div>
      {/* Render Websites */}
      <div className="py-6 md:py-10 flex flex-col space-y-3 md:space-y-0 md:grid md:grid-col-2 lg:grid-cols-3 items-center md:gap-5">
        {data.map((item: any, index) => (
          <CompanyCard
            key={index}
            id={item._id}
            icon={item.icon}
            name={item.name}
            website={item.website}
            ssl={item.ssl}
            active={item.active}
            message={item.message}
            date={item.date}
          />
        ))}
      </div>
      <AddSite
        show={openModal}
        onClose={() => setOpenModal(!openModal)}
        render={() => setR(!r)}
      />
    </div>
  );
};

export default Dashboard;
