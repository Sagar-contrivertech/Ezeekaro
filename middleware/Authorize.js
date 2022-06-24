const express = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../model/User")

exports.AuthorizeUser = async (req, res , next) => {
    try {
        // const token = req.cookies.token;
        const token = req.get('Authorization');
        // console.log("token is " + token)
        const verifyuser = jwt.verify(token , process.env.SECRET_KEY)
        // console.log("verifytiken is " )
        // console.log(verifyuser)
        const UserId = await User.findById(verifyuser.id);
        // console.log("data is " + UserId)
        if (!UserId) {
            throw new Error("user Is Not FOund")
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

exports.authorizeGrant = (...grant) => {
    console.log(grant)
    return async (req, res, next) => {
        if (!grant.includes(req.UserId.Permission)) {
            console.log(req.UserId.Permission, 'Permission');
            return next(res.json("permission not allowed"))
        }
        next()
    }
}