import React, { useState } from "react";
import Image from "next/image";
import EditSite from "./EditSite";
import { IoIosRadioButtonOn } from "react-icons/io";
import Link from "next/link";
import { toast } from "react-hot-toast";
interface CompanyProps {
  icon: any;
  name: any;
  website: any;
  ssl: any;
  active: any;
  message: any;
  date: any;
  id: any;
  render: any;
}

const CompanyCard = ({
  icon,
  name,
  website,
  ssl,
  active,
  message,
  date,
  render,
  id,
}: CompanyProps) => {
  const [editModal, setEditModal] = useState(false);

  // Delete Company
  const deleteCompany = (event: any) => {
    event.stopPropagation();
    event.preventDefault();

    toast(
      (t) => (
        <span className="flex flex-col space-y-4 items-center">
          <p className="text-lg ">
            Are you sure you want to delete this company?
          </p>

          <div className="flex items-center space-x-3">
            <div
              className="cursor-pointer bg-blue-500 px-4 py-2 rounded-md text-white "
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </div>

            {/*Write the delete functionality for a user post */}
            <div
              className="cursor-pointer bg-[#E31B23]  px-4 py-2 rounded-md text-white"
              onClick={async () => {
                // WRITE THE DELETE FUNCTION FOR AN OFFER
                const res: any = await fetch(`/api/company?companyId=${id}`, {
                  method: "DELETE",
                });
                const resp = await res.json();

                setTimeout(() => {
                  render();

                  toast.success(resp["message"]);

                  toast.dismiss(t.id);
                }, res);
              }}
            >
              Delete
            </div>
          </div>
        </span>
      ),
      {
        position: "top-center",
        duration: 6000,
      }
    );
  };

  const convertDate = (dateStr: any) => {
    const date: any = new Date(dateStr);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
  };

  return (
    <div className="h-[37vh] w-full rounded-xl overflow-hidden flex flex-col justify-between  bg-slate-600 text-base md:text-lg">
      <p
        className={` ${
          message ? "inline-block bg-slate-500" : " invisible bg-slate-600"
        }  font-semibold capitalize py-2  text-red-300 text-center  `}
      >
        {message ? message : "Checking"}
      </p>
      <div className="flex items-start space-x-3 lg:space-x-5 p-6 lg:p-8 ">
        <div className=" flex items-start justify-between">
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
        </div>

        <div className="flex flex-col space-y-1 lg:space-y-2 w-full ">
          <div className="flex space-x-2 items-start w-full overflow-hidden">
            <p className=" font-semibold">Name:</p>

            <p className=" text-ellipsis truncate">{name}</p>
          </div>
          <div className="flex space-x-2 items-start">
            <p className=" font-semibold">Website:</p>

            <p className=" underline text-white">
              <Link href={website} target="_blank" rel="noopener noreferrer">
                Visit website
              </Link>
            </p>
          </div>
          <div className="flex space-x-2 items-center           ">
            <p className=" font-semibold">SSL:</p>
            <IoIosRadioButtonOn
              size={20}
              color={ssl === false ? "red" : "green"}
            />
          </div>
          <div className="flex space-x-2 items-center">
            <p className=" font-semibold">Active:</p>
            <IoIosRadioButtonOn
              size={20}
              color={active === false ? "red" : "green"}
            />
          </div>

          <div className="flex space-x-2 items-start">
            <p className=" font-semibold">Checked:</p>

            <p>{convertDate(date)}</p>
          </div>
        </div>
        {/*
         */}
      </div>

      <div className="flex items-center divide-x-1 divide-slate-600 pt-4 w-full">
        <button
          className="bg-[#1890ff] text-sm md:text-base  font-semibold py-2 px-3 w-full  duration-200 ease-in-out text-white hover:text-[#1890ff]  hover:bg-white "
          onClick={() => setEditModal(true)}
        >
          Edit
        </button>
        <button
          className=" bg-red-600  text-sm md:text-base font-semibold py-2 px-3  duration-200 ease-in-out text-white hover:red-600  hover:bg-white hover:text-red-600 w-full"
          onClick={deleteCompany}
        >
          Delete
        </button>
      </div>

      <EditSite
        show={editModal}
        onClose={() => setEditModal(!editModal)}
        name={name}
        icon={icon}
        render={render}
        website={website}
        id={id}
      />
    </div>
  );
};

export default CompanyCard;
