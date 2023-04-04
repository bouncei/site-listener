import { useState } from "react";
import EditUser from "./EditUser";
import { Button } from "../elements";
import { toast } from "react-hot-toast";

interface tableBodyProps {
  item: any;
  index: any;
  user: any;
  render: any
}
const TableCard = ({ item, index, user, render }: tableBodyProps) => {
  const [editModal, setEditModal] = useState(false);
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

  // Delete User
  const deleteUser = (id: any) => {
    toast(
      (t) => (
        <span className="flex flex-col space-y-4 items-center">
          <p className="text-lg ">Are you sure you want to delete this user?</p>

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
                const res = await fetch(`/api/users?userId=${id}`, {
                  method: "DELETE",
                });
                const resp = await res.json();
                toast.success(resp["message"]);
                render()

                toast.dismiss(t.id);
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
  return (
    <tr className={`${index % 2 ? "bg-slate-600" : ""} rounded-md`}>
      <td className="p-2 border-t border-gray-300">
        <p className="">{item?.username}</p>
      </td>
      <td className="p-4 border-t hidden md:flex border-gray-300 text-[#3b90e0fe] text-center ">
        {convertDate(item.date)}
      </td>
      <td className="p-4 px-5 border-t border-gray-300  text-center">
        {item.email}
      </td>
      {user?.isAdmin && (
        <>
          <td className="p-4 border-t border-gray-300  text-center">
            <Button onClick={() => setEditModal(!editModal)}>Edit</Button>
          </td>
          <td className="p-4 border-t border-gray-300  text-center">
            <button
              className=" bg-red-600 rounded-lg  text-sm md:text-base font-semibold py-2 px-3  duration-200 ease-in-out text-white hover:red-600  hover:bg-white hover:text-red-600 "
              onClick={() => deleteUser(item._id)}
            >
              Delete
            </button>
          </td>
          <EditUser
            show={editModal}
            onClose={() => setEditModal(!editModal)}
            username={item.username}
            password={item.password}
            email={item.email}
            render={render}
          />
        </>
      )}
    </tr>
  );
};

export default TableCard;
