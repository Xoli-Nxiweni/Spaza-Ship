import { Schema, model } from "mongoose";

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
      subtotal: { type: Number, required: true },
    },
  ],
  totalQuantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 },
});

export default model("Cart", CartSchema);
