const express = require("express")
const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../middleware/SendMail");
const generator = require('generate-password');
const Coupon = require("../model/Coupon");
const catchasync = require("../middleware/catchasync");
const crypto = require('crypto')
const cloudinary = require("cloudinary")

// const serviceAccount = require("../secret.json")

// const firebaseToken = 'avgcvghsdvcgvgcgcgvv'

exports.RegisterUser = catchasync(async (req, res) => {
    try {
        const { Name, Email, Contact, Password, Pincode, Pancard, Aadharcard, Address, State, City, Vehical_Modal, Bike_Register_No, Medical_Certificate, Puc_Certificate, Bike_Insurance_Policy, Vehicle_image, Role, Status } = req.body;

        const FindUser = await User.findOne({ Email: Email });

        let medicalImageLinks
        let pucCertificateLinks 
        let vehicleImageLinks
        let bikeInsurancePolicyLinks
        // Medical_certificate image
        let imageFolder = []
        result = await cloudinary.v2.uploader.upload(Medical_Certificate,Puc_Certificate,Vehicle_image,Bike_Insurance_Policy, {
            folder: 'medicalImage'
        });

        console.log(result);
        medicalImageLinks = {
            public_id: result.public_id,
            url: result.secure_url
        }
        console.log(medicalImageLinks);
        // Puc image
        // pucResult = await cloudinary.v2.uploader.upload(Puc_Certificate, {
        //     folder: 'pucImage'
        // });

        pucCertificateLinks = {
            public_id: result.public_id,
            url: result.secure_url
        }

        // // // vehicle image
        // vehicleResult = await cloudinary.v2.uploader.upload(Vehicle_image.tempFilePath, {
        //     folder: 'vehicleImage'
        // });

        // vehicleImageLinks = {
        //     public_id: vehicleResult.public_id,
        //     url: vehicleResult.secure_url
        // }
        // // bike Insurance image

        // bikeResult = await cloudinary.v2.uploader.upload(Bike_Insurance_Policy, {
        //     folder: 'bikeImage'
        // });

        // bikeInsurancePolicyLinks = {
        //     public_id: bikeResult.public_id,
        //     url: bikeResult.secure_url
        // }

        if (FindUser) {
            res.status(400).json({ error: "This Email Id Is Already Register !" })
            return
        }


        const users = await User.create({
            Name , Email , Contact , Password , Pincode , Pancard , Aadharcard , Address , State , City ,
             Vehical_Modal , Bike_Register_No , Medical_Certificate: medicalImageLinks , Puc_Certificate: pucCertificateLinks , 
             Bike_Insurance_Policy: bikeInsurancePolicyLinks , Vehicle_image: vehicleImageLinks , Role , Status
        })

        if (!users) {
            res.status(400).json({ error: "user Is Not Registered" })
            return
        }

        if (users) {
            let pass = await users.Bycryptpassword();

            await users.save()
            if (users.Role === "Delivery") {
                await sendEmail({
                    email: Email,
                    subject: `SuccessFull Registeration ${users.firstName} Hello`,
                    message: "This is Registration message, please wait for your kyc !",
                });
            }

            res.status(200).json({ message: "User Is Registered", users })
            return
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({error : "user Is Not Register",error})
    }
})

exports.LoginUser = catchasync(async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log(Email, Password)
        const FindUser = await User.findOne({ Email: Email });

        if (!FindUser) {
            res.status(400).json({ error: "This User Is Not FOund In Our DataBase" })
            return
        }

        if (FindUser) {
            let isMatch = await bcrypt.compare(Password, FindUser.Password)

            if (!isMatch) {
                res.status(400).json({ error: "Please Provide Valid Password" })
                return
            }

            if (isMatch) {
                const token = jwt.sign({ id: FindUser.id }, process.env.SECRET_KEY, {
                    expiresIn: "7d",
                    // httpOnly: true
                });
                console.log(token)
                // res.cookie("token",token , {
                //     httpOnly: true
                // });
                res.status(200).json({ message: "User Is Matched With This Credential ", FindUser, token })
                return
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "User Is Not Matched With This Credential " })
    }
})

// exports.adminLogin = async(req,res)

exports.LogoutUser = async (req, res) => {
    try {
        // console.log(req.UserId)
        const Users = req.UserId;

        res.clearCookie('token', {
            expiresIn: Date.now()
        });

        res.status(200).json({ message: "User logout ", Users })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "User cannot logout " })
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const newUserData = {
            Name: req.body.Name,
            Email: req.body.Email,
            Contact: req.body.Contact,
            Password: req.body.Password,
            Pincode: req.body.Pincode,
            Pancard: req.body.Pancard,
            Aadharcard: req.body.Aadharcard,
            Address: req.body.Address,
            State: req.body.State,
            City: req.body.City,
            Vehical_Modal: req.body.Vehical_Modal,
            Bike_Register_No: req.body.Bike_Register_No,
            Medical_Certificate: req.body.Medical_Certificate,
            Puc_Certificate: req.body.Puc_Certificate,
            Bike_Insurance_Policy: req.body.Bike_Insurance_Policy,
            Vehicle_image: req.body.Vehicle_image,
            Role: req.body.Role,
            Status: req.body.Status
        }

        // Update avatar
        // if (req.body.avatar !== '') {
        //     const user = await User.findById(req.user.id)

        //     const image_id = user.avatar.public_id;
        //     const res = await cloudinary.uploader.destroy(image_id);

        //     const result = await cloudinary.uploader.upload(req.body.avatar, {
        //         folder: 'avatars',
        //         width: 150,
        //         crop: "scale"
        //     })

        //     newUserData.avatar = {
        //         public_id: result.public_id,
        //         url: result.secure_url
        //     }
        // }

        const user = await User.findByIdAndUpdate(req.UserId, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            user
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }

}

// forget password
exports.forgotPassword = async (req, res, next) => {
    const userEmail = await User.findOne({ Email: req.body.email })
    console.log(userEmail);
    if (!userEmail) {
        return next(res.status(400).json({ message: "Inavlid email" }))
    }
    if (userEmail) {
        const token = userEmail.reset()
        console.log(userEmail, token);
        await userEmail.save({ validateBeforeSave: false })
        // const updateUser = await User.findByIdAndUpdate(userEmail._id,{
        //     token: token
        // }, {new:true})
        // console.log(updateUser);
        const resetUrl = `${req.protocol}://${req.get('host')}/api/password/reset/${token}`;

        const message = `your password reset token is followed:\n ${resetUrl}\n if you are not please ingonre`
        // console.log(message)
        try {
            await sendEmail({
                email: req.body.email,
                subject: "password reset ",
                message
            })
            console.log(req.body.email, 'emal')
            res.status(200).json({ message: "email send sucessfully" })
        } catch (err) {
            User.getResetpasswordToken = undefined;
            User.resetpasswordExpire = undefined;
            await userEmail.save({ validateBeforeSave: false })
            console.log(err)
            res.status(400).json({ message: "error while sending email", err })
        }
    }

}

// reset password
exports.resetPassword = async (req, res, next) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
        console.log(resetPasswordToken);
        const user = await User.findOne({
            resetPasswordToken,
            resetpasswordExpire: { $gt: Date.now() }
        })
        console.log(user);
        if (!user) {
            return next(res.status(400).json({ mesage: "password token invalid or expried", }))
        }
        if (!req.body.password == req.body.confirmpassword) {
            return next(res.status(400).json({ message: "password and confirm password dont match" }))
        }
        // user.Password = req.body.password 
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(req.body.password, salt);
        console.log('password', user.Password)
        user.resetpassword = undefined;
        user.resetpasswordExpire = undefined;

        // const userPass = await User.updateOne({Password: user.password})
        // console.log(userPass);
        await user.save()
        console.log(user);
        res.status(200).json({ message: "password reset ,!go back and login", resetPasswordToken })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "token invalid ! something went wrong" })
    }
}

// update Password

exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password')
        if (!user) {
            res.status(401).json({ message: "user not found" })
        }
        const isMatched = await user.comparePassword(req.body.oldPassword)
        if (!isMatched) {
            return next(res.status(400).json({ message: "old password is incorrect" }))
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();
        res.status(200).json({ message: "password update sucessfuly" })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "something went wrong" })
    }
}

exports.GetAllUser = catchasync(async (req, res) => {
    try {

        const FindUsers = await User.find();
        var count;

        if (!FindUsers) {
            res.status(400).json({ error: "All User Not FOund" })
            return
        }

        if (FindUsers) {
            res.status(200).json({ message: "Users FOund", count: FindUsers.length, FindUsers })
            return
        }
    } catch (error) {
        res.status(400).json({ error: "All User Is Not FOund" })
    }
})

exports.GetAllUserWithCoupen = catchasync(async (req, res) => {
    try {
        const FindUsers = await User.find({ CouponCodes: req.body.id });

        // for (let i = 0; i < FindUsers.CouponCodes.length; i++) {
        // const findcoupon = await Coupon.findById(FindUsers.CouponCodes[i].code_id);

        //     console.log(findcoupon , "hello")
        // }


        if (!FindUsers) {
            res.status(400).json({ error: "All User Not FOund" })
            return
        }

        if (FindUsers) {
            res.status(200).json({ message: "Users FOund", FindUsers })
            return
        }
    } catch (error) {
        res.status(400).json({ error: "All User Is Not FOund" })
    }
})

exports.activateDelivery = catchasync(async (req, res) => {
    try {
        const DeliveryUser = await User.findById(req.params.id)

        if (!DeliveryUser) {
            res.status(400).json({ message: "Delivery User Is Not found" })
            return
        }

        if (DeliveryUser) {
            const DeliveryPasswordgenerate = generator.generate({
                length: 10,
                numbers: true
            });

            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                Password: await bcrypt.hash(DeliveryPasswordgenerate, 10),
                Status: 'active'
            }, { new: true })

            if (!updateUser) {
                res.status(400).json({ message: "Update Delivery Is Not Possible" })
                return
            }

            if (updateUser) {
                await sendEmail({
                    email: DeliveryUser.Email,
                    subject: `SuccessFull Registeration completion Kyc Done `,
                    message: `Your User Id Is ${DeliveryUser.Email} And Password Is ${DeliveryPasswordgenerate} Kindly Login With This Credential , Thank You.`,
                });
                res.status(200).json({ message: "Delivery User Is found", updateUser })
                return
            }

        }
        console.log(DeliveryUser)
    } catch (error) {
        res.status(400).json({ message: "Delivery User Is Not Activate Yet", })
    }
})

exports.getUserDataById = catchasync(async (req, res) => {
    try {
        // const id = req.params.id
        const getUser = await User.findById(req.params.id)
        if (!getUser) {
            return res.status(400).json({ message: "Cannot find the user" })
        }
        return res.status(200).json({ message: "User By Id", getUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})


exports.editProfile = catchasync(async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id)
        if (!findUser) {
            return res.status(401).json({ message: "user does not exist" })
        }
        if (findUser) {

            const newUserData = {
                Name: req.body.Name,
                Email: req.body.Email,
                Contact: req.body.Contact,
                Password: req.body.Password,
                Pincode: req.body.Pincode,
                Pancard: req.body.Pancard,
                Aadharcard: req.body.Aadharcard,
                Address: req.body.Address,
                State: req.body.State,
                City: req.body.City,
                Vehical_Modal: req.body.Vehical_Modal,
                Bike_Register_No: req.body.Bike_Register_No,
                Medical_Certificate: req.body.Medical_Certificate,
                Puc_Certificate: req.body.Puc_Certificate,
                Bike_Insurance_Policy: req.body.Bike_Insurance_Policy,
                Vehicle_image: req.body.Vehicle_image,
                Role: req.body.Role,
                Status: req.body.Status
            }

            const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
            res.status(200).json({
                success: true,
                user
            })
            return
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "something went wrong" })
    }
})