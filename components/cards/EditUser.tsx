import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { LoadingIcon } from "../elements";
import { toast } from "react-hot-toast";

interface AdduserProps {
  show: any;
  onClose: any;
  render: any;
  username: any;
  email: any;
  password: any;
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

const EditUser = ({
  show,
  onClose,
  render,
  username,
  email,
  password,
}: AdduserProps) => {
  const [formData, setFormData] = useState({
    username: username,
    email: email,
    password: password,
    confirm_pwd: "",
  });
  const [hide, setHide] = useState({
    password: true,
    confirm_pwd: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (formData.password !== formData.confirm_pwd) {
      toast.error("Passwords does not match");
      return;
    }
    setLoading(true);

    try {
      const resp = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();

      setTimeout(() => {
        setLoading(false);
        toast.success(data["message"]);
        render();
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
            <p>Edit {username}</p>

            <p onClick={onClose} className="pr-3 cursor-pointer">
              x
            </p>
          </Typography>

          <form
            className="flex flex-col space-y-4 pt-3 md:pt-6 items-center"
            onSubmit={handleSubmit}
          >
            <div className=" w-full space-y-2">
              <label htmlFor="username">Username</label>

              <input
                type="text"
                // className="hidden"
                placeholder="Enter Username"
                id="username"
                name="username"
                value={formData["username"]}
                className={fiedStyles.input}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full space-y-2">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                id="email"
                type="email"
                value={formData["email"]}
                onChange={handleChange}
                className={fiedStyles.input}
                placeholder="e.g; example@email.com"
                required
              />
            </div>

            <div className="w-full space-y-2">
              <label htmlFor="password">Password</label>

              <div className="flex items-center relative">
                <input
                  name="password"
                  id="password"
                  type={hide.password ? "password" : "text"}
                  onChange={handleChange}
                  value={formData["password"]}
                  className={fiedStyles.input}
                  placeholder="Enter Password"
                  required
                />

                <span
                  className="absolute text-sm cursor-pointer rounded p-1 right-3"
                  onClick={() => setHide({ ...hide, password: !hide.password })}
                >
                  {hide.password ? "show" : "hide"}
                </span>
              </div>
            </div>

            <div className="w-full space-y-2">
              <label htmlFor="confirm_pwd">Confirm Password</label>

              <div className="flex items-center relative">
                <input
                  name="confirm_pwd"
                  id="confirm_pwd"
                  type={hide.confirm_pwd ? "password" : "text"}
                  onChange={handleChange}
                  className={fiedStyles.input}
                  placeholder="Comfirm Password"
                  required
                />
                <span
                  className="absolute text-sm cursor-pointer rounded p-1 right-3"
                  onClick={() =>
                    setHide({ ...hide, confirm_pwd: !hide.confirm_pwd })
                  }
                >
                  {hide.password ? "show" : "hide"}
                </span>
              </div>
            </div>

            <div className="pt-4 w-full">
              <button
                className="bg-[#1890ff] font-semibold py-2 px-3 rounded-lg duration-200 ease-in-out text-white hover:text-[#1890ff]  hover:bg-white w-full "
                type="submit"
              >
                {loading ? <LoadingIcon /> : "Update"}
              </button>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditUser;
