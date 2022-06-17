const express = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../model/User")

exports.AuthorizeUser = async (req, res , next) => {
    try {
        const token = req.cookies.token;
        // console.log("token is " + token)
        const verifyuser = jwt.verify(token , process.env.SECRET_KEY)
        // console.log("verifytiken is " )
        // console.log(verifyuser)
        const UserId = await User.findById(verifyuser.id);
        // console.log("data is " + UserId)
        if (!UserId) {
            throw new Error("Employee Is Not FOund")
        }
        req.UserId = UserId

        next()
    } catch (error) {
        res.status(400).json({message : "User Is Not Register"})
    }
}

exports.authorizeRoles = (...roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.UserId.Role)) {
            console.log(req.UserId.Role, 'roles');
            return next(res.json("roles not allowed"))
        }
        next()
    }
}