//imports
import mongoose from "mongoose";

//schema
const cartSchema = new mongoose.Schema(
  {
    products: {
      type: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
          quantity: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const cart = new mongoose.model("carts", cartSchema);

export default cart;