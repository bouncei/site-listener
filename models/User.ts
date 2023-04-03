import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: {
    type: Object,
  },
});

let UserModel: any;

try {
  UserModel = mongoose.model("users");
} catch (err) {
  UserModel = mongoose.model("users", UserSchema);
}

export default UserModel;
