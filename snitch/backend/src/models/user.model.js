import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userScema = new mongoose.Schema({
  email: {
    type: string,
    unique: true,
    require: true,
  },
  contact: {
    type: string,
    require: false,
  },
  password: {
    type: string,
    require: true,
  },
  fullname: {
    type: string,
    require: true,
  },
  role: {
    type: string,
    enum: ["buyer", "seller"],
    default: "buyer",
  },
});

userScema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

userScema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("users", userScema);

export default userModel;
