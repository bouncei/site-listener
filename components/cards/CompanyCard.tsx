import React, { useState } from "react";
import Image from "next/image";
import EditSite from "./EditSite";
import { IoIosRadioButtonOn } from "react-icons/io";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { LoadingIcon } from "../elements";
import { convertDate } from "@/utils/helper";
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
  const [loading, setLoading] = useState(false);

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
                //DELETE FUNCTION FOR AN OFFER
                try {
                  setLoading(true);
                  const res: any = await fetch(`/api/company?companyId=${id}`, {
                    method: "DELETE",
                  });
                  const resp = await res.json();

                  if (res && resp) {
                    render();
                    toast.dismiss(t.id);
                    setLoading(false);

                    toast.success(resp["message"]);
                  }
                } catch (error: any) {
                  console.error(error);
                  setLoading(false);
                  if (!error?.response?.message) {
                    toast.error("Check internet connection");
                  }
                }
              }}
            >
              {loading ? <LoadingIcon /> : "Delete"}
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

  return (
    <div className=" w-full rounded-xl overflow-hidden text-xs md:text-base flex flex-col justify-between  bg-slate-600  ">
      <p
        className={` ${
          message ? "inline-block bg-slate-500" : " invisible bg-slate-600"
        }  font-semibold capitalize py-2  text-red-300 text-center  `}
      >
        {message ? message : "Checking"}
      </p>
      <div className="flex items-start space-x-3 lg:space-x-5 p-6 lg:p-8 ">
        <div className=" flex items-start justify-between">
          {icon && (
            <div className="relative w-20 h-20 md:w-28 md:h-28 2xl:w-32 2xl:h-32  ">
              <Image
                fill
                sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                className="object-cover h-full w-full hover:scale-105  rounded-full border-2 border-[#202225] group-hover:opacity-40 ease-in-out duration-500"
                src={icon}
                alt="profile image"
              />
            </div>
          )}
        </div>

        <div className=" flex-1 flex flex-col space-y-1 lg:space-y-2 w-full ">
          <div className="flex space-x-2 items-start w-full overflow-hidden">
            <p className=" font-semibold">Name:</p>

            <p className=" text-ellipsis truncate">{name ? name : ""}</p>
          </div>
          <div className="flex space-x-2 items-start">
            <p className=" font-semibold">Website:</p>

            <p className=" underline text-white">
              {website && (
                <Link href={website} target="_blank" rel="noopener noreferrer">
                  Visit website
                </Link>
              )}
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

          {date && (
            <div className="flex space-x-2 items-start">
              <p className=" font-semibold">Checked:</p>

              <p>{convertDate(date)}</p>
            </div>
          )}
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
