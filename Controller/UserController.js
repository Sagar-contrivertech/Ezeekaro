const express = require("express")
const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../middleware/SendMail");
const generator = require('generate-password');
const Coupon = require("../model/Coupon");

exports.RegisterUser = async (req, res) => {
    try {
        const { Name , Email , Contact , Password , Pincode , Pancard , Aadharcard , Address , State , City , Vehical_Modal , Bike_Register_No , Medical_Certificate , Puc_Certificate , Bike_Insurance_Policy , Vehicle_image , Role , Status } = req.body;

        const FindUser = await User.findOne({Email : Email});

        if (FindUser) {
            res.status(400).json({error : "This Email Id Is Already Register !"})
            return
        }

        const users = await User.create({
            Name , Email , Contact , Password , Pincode , Pancard , Aadharcard , Address , State , City , Vehical_Modal , Bike_Register_No , Medical_Certificate , Puc_Certificate , Bike_Insurance_Policy , Vehicle_image , Role , Status
        })

        if (!users) {
            res.status(400).json({error : "user Is Not Registered"})
            return
        }
        
        if (users) {
            let pass = await users.Bycryptpassword();

            await users.save()
            if (users.Role === "Delivery") {                
                await sendEmail({
                    email: Email,
                    subject: `SuccessFull Registeration ${users.firstName} Hello`,
                    message : "This is Registration message, please wait for your kyc !",
                });
            }

            res.status(200).json({message : "User Is Registered" , users})
            return
        }

    } catch (error) {
        res.status(400).json({error : "user Is Not Register"})
    }
}

exports.LoginUser = async (req, res) => {
    try {
        const { Email , Password } = req.body;

        const FindUser = await User.findOne({Email : Email});

        if (!FindUser) {
            res.status(400).json({error : "This User Is Not FOund In Our DataBase"})
            return
        }
        
        if (FindUser) {
            let isMatch = await bcrypt.compare(Password , FindUser.Password)
            
            if (!isMatch) {
                res.status(400).json({error : "Please Provide Valid Password"})
                return
            }

            if (isMatch) {
                const token = jwt.sign({ id: FindUser.id }, process.env.SECRET_KEY, {
                    expiresIn: "7d",
                  });
                console.log(token)
                res.cookie("token",token);
                res.status(200).json({message : "User Is Matched With This Credential " , FindUser , token})
                return
            }
        }
    } catch (error) {
        res.status(400).json({message : "User Is Not Matched With This Credential " })
    }
}


exports.GetAllUser = async (req, res) => {
    try {
        
        const FindUsers = await User.find();

        if (!FindUsers) {
            res.status(400).json({error : "All User Not FOund"})
            return
        }
        
        if (FindUsers) {
            res.status(200).json({message : "Users FOund" , FindUsers})
            return
        }
    } catch (error) {
        res.status(400).json({error : "All User Is Not FOund"})
    }
}

exports.GetAllUserWithCoupen = async (req, res) => {
    try {
        const FindUsers = await User.find({CouponCodes : req.body.id});

        // for (let i = 0; i < FindUsers.CouponCodes.length; i++) {
            // const findcoupon = await Coupon.findById(FindUsers.CouponCodes[i].code_id);

        //     console.log(findcoupon , "hello")
        // }
        

        if (!FindUsers) {
            res.status(400).json({error : "All User Not FOund"})
            return
        }
        
        if (FindUsers) {
            res.status(200).json({message : "Users FOund" , FindUsers})
            return
        }
    } catch (error) {
        res.status(400).json({error : "All User Is Not FOund"})
    }
}

exports.activateDelivery = async (req, res) => {
    try {
        const DeliveryUser = await User.findById(req.params.id)

        if (!DeliveryUser) {
            res.status(400).json({message : "Delivery User Is Not found" })
            return
        }
        
        if (DeliveryUser) {
            const DeliveryPasswordgenerate = generator.generate({
                length: 10,
                numbers: true
            });

            const updateUser = await User.findByIdAndUpdate(req.params.id , {
                Password :  await bcrypt.hash(DeliveryPasswordgenerate , 10),
                Status : 'active'
            } , {new : true})

            if (!updateUser) {
                res.status(400).json({message : "Update Delivery Is Not Possible" })
                return
            }

            if (updateUser) {
                await sendEmail({
                    email: DeliveryUser.Email,
                    subject: `SuccessFull Registeration completion Kyc Done `,
                    message : `Your User Id Is ${DeliveryUser.Email} And Password Is ${DeliveryPasswordgenerate} Kindly Login With This Credential , Thank You.`,
                });
                res.status(200).json({message : "Delivery User Is found" , updateUser })
                return
            }
            
        }
        console.log(DeliveryUser)
    } catch (error) {
        res.status(400).json({message : "Delivery User Is Not Activate Yet" , })
    }
}