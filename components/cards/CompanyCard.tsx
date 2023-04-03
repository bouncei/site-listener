import React from "react";
import Image from "next/image";
import { Button } from "../elements";

interface CompanyProps {
  icon: any;
  name: any;
  website: any;
  ssl: any;
  active: any;
  message: any;
  date: any;
}

const CompanyCard = ({
  icon,
  name,
  website,
  ssl,
  active,
  message,
  date,
}: CompanyProps) => {
  return (
    <div className="p-6 bg-slate-600 rounded-lg tedxt-base md:text-lg">
      <div className="flex items-start justify-between">
        <div className="relative w-20 h-20 md:w-40 md:h-40  ">
          <Image
            fill
            sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
            className="object-cover h-full w-full rounded-full border-2 border-[#202225] group-hover:opacity-40 ease-in-out duration-500"
            // src="https://images.unsplash.com/photo-1584361853901-dd1904bb7987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            src={icon}
            alt="profile image"
          />
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Button>Edit</Button>
          <button className=" bg-red-600  font-semibold py-2 px-3 rounded-lg duration-200 ease-in-out text-white hover:text-[#1890ff]  hover:bg-white ">
            Delete
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex space-x-2 items-center">
          <p>Name:</p>

          <p>{name}</p>
        </div>
        <div className="flex space-x-2 items-center">
          <p>Website:</p>

          <p className=" underline">{website}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
