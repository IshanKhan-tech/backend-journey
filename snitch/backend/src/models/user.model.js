import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userScema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: false },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },
    fullname: { type: String, required: true },
    role: {
        type: String,
        enum: [ "buyer", "seller" ],
        default: "buyer"
    }
    
})

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
