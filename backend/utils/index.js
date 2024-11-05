// import env from 'dotenv'
// env.config()

// import jwt from "jsonwebtoken"

// const generateToken = (id) =>{
//     return jwt.sign({
//         id: id
//     }, process.env.JWT_SECTRET, {
//         expiresIn: "4h"
//     })
// }

// export default generateToken;

import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Replace with an environment variable in production

const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};

export default generateToken;
