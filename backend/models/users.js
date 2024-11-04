import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your full name"],
            maxLength: [50, "Name cannot exceed 50 characters"],
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z\s-]+$/.test(value);
                },
                message: "Name must contain only letters, spaces, or hyphens.",
            },
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: true,
            minLength: [8, "Password must be at least 8 characters"],
            validate: {
                validator: function (value) {
                    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value);
                },
                message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            },
        },
        role: {
            type: String,
            required: true,
            enum: {
                values: ["customer", "vendor"],
                message: "{VALUE} is not a valid role",
            },
            default: "customer", 
        },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to match passwords
userSchema.methods.matchPasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
