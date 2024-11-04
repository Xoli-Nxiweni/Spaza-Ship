import bcrypt from "bcrypt";
import generateToken from "../utils/index.js";
import User from "../models/users.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create new user (password will be hashed by the pre-save hook)
        const user = await User.create({
            name,
            email,
            password,  // Pass plain password; pre-save hook will hash it
        });

        res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
        });
    } catch (error) {
        console.error("Registration error:", error); // Log for debugging
        if (error.name === "ValidationError") {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if the user exists and if the password matches
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                error: "Invalid Login Credentials"
            });
        }

        // Generate a token for the user
        const token = await generateToken(user._id);
        res.status(200).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            token,
        });
    } catch (error) {
        console.error("Login error:", error); // Log for debugging
        res.status(500).json({ error: error.message });
    }
};

export default {
    registerUser,
    loginUser,
};
