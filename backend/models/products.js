import mongoose from "mongoose";

// Define the product schema
const productsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            maxLength: [100, "Product name cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Product description is required"],
            trim: true,
            maxLength: [1000, "Product description cannot exceed 1000 characters"],
        },
        price: {
            type: Number,
            required: [true, "Product price is required"],
            min: [0, "Price must be a positive number"],
        },
        category: {
            type: String,
            required: [true, "Product category is required"],
            enum: {
                values: ["Electronics", "Fashion", "Home", "Books", "Sports", "Toys", "Other"],
                message: "{VALUE} is not a valid category",
            },
        },
        quantity: {
            type: Number,
            required: [true, "Product quantity is required"],
            min: [0, "Quantity cannot be negative"],
        },
        images: [{
            type: String,
            required: [true, "At least one image is required"],
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Products", productsSchema);
