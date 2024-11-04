import env from 'dotenv'
env.config()

import jwt from "jsonwebtoken"

const generateToken = (id) =>{
    return jwt.sign({
        id: id
    }, process.env.JWT_SECTRET, {
        expiresIn: "4h"
    })
}

export default generateToken;