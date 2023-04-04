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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

let UserModel: any;

try {
  UserModel = mongoose.model("users");
} catch (err) {
  UserModel = mongoose.model("users", UserSchema);
}

export default UserModel;
