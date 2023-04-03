import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { LoadingIcon } from "../elements";
import { toast } from "react-hot-toast";

interface AddSiteProps {
  show: any;
  onClose: any;
}
const fiedStyles = {
  input:
    "w-full rounded-md p-2 px-4 focus:border focus:border-amber-600  bg-slate-500",
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "rgb(51 65 85)",
  color: "white",
  boxShadow: 24,
  p: 3,
};

const AddSite = ({ show, onClose }: AddSiteProps) => {
  const [formData, setFormData] = useState({
    icon: null,
    name: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    if (name === "icon") {
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
          resolve(reader.result);
          setFormData({ ...formData, [name]: reader.result });
        };
        reader.onerror = (error) => reject(error);
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const resp = await fetch("/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();

      setTimeout(() => {
        setLoading(false);
        setFormData({
          icon: null,
          name: "",
          website: "",
        });
        toast.success(data["message"]);
        onClose();
      }, data);

      return;
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Operation Failed");
      return;
    }
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={show}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={show}>
        <Box sx={style} className="w-[80vw] md:w-[50vw]">
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            className="flex justify-between items-center font-medium text-lg  md:text-2xl"
          >
            <p>Add A New Website</p>

            <p onClick={onClose} className="pr-3 cursor-pointer">
              x
            </p>
          </Typography>

          <form
            className="flex flex-col space-y-4 items-center"
            onSubmit={handleSubmit}
          >
            <div className=" cursor-pointer">
              {formData["icon"] ? (
                <label htmlFor="icon" className=" cursor-pointer py-4">
                  <img
                    src={formData["icon"]}
                    alt="company icon"
                    className=" object-cover h-44 w-44 rounded-md mt-6 "
                  />
                </label>
              ) : (
                <label
                  htmlFor="icon"
                  className=" cursor-pointer flex justify-center items-center border border-dashed p-14 rounded-xl mt-6"
                >
                  +
                </label>
              )}
              <input
                type="file"
                className="hidden"
                id="icon"
                name="icon"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full space-y-2">
              <label htmlFor="name">Company Name</label>
              <input
                name="name"
                id="name"
                type="text"
                onChange={handleChange}
                className={fiedStyles.input}
                placeholder="Name"
                required
              />
            </div>

            <div className="w-full space-y-2">
              <label htmlFor="website">Company Website</label>
              <input
                name="website"
                id="website"
                type="text"
                onChange={handleChange}
                className={fiedStyles.input}
                placeholder="e.g; www.example.com"
                required
              />
            </div>

            <div className="pt-4 w-full">
              <button
                className="bg-[#1890ff] font-semibold py-2 px-3 rounded-lg duration-200 ease-in-out text-white hover:text-[#1890ff]  hover:bg-white w-full "
                type="submit"
              >
                {loading ? <LoadingIcon /> : "Create"}
              </button>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddSite;
