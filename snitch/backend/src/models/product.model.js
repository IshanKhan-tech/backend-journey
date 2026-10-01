import mongoose from "mongoose";
import userModel from "./user.model";

const productScema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
  price: {
    amount: {
      type: String,
      require: true,
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "JPY", "EUR", "EUR"],
      default: "INR",
    },
  },
  images: {
    url: {
      type: String,
      require: true,
    },
    alt: {
      type: String,
      require: true,
    },
  },
});

const productModel = mongoose.model("products", productScema);

export default productModel;
