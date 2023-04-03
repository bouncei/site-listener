import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
  },

  ssl: {
    type: Boolean,
    default: false,
  },

  active: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
  },

  date: {
    type: Date,
    default: new Date(),
  },
});

let Company: any;

try {
  Company = mongoose.model("companies");
} catch (err) {
  Company = mongoose.model("companies", CompanySchema);
}

export default Company;
