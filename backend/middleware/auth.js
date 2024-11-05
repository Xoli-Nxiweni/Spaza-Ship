import jwt from "jsonwebtoken";
import User from "../models/users.js";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).send({ error: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({ _id: decoded.userId, "tokens.token": token });
        if (!user) return res.status(401).send({ error: "Invalid token" });

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid token" });
    }
};
