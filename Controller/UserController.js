const express = require("express")
const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../middleware/SendMail");
const generator = require('generate-password');
const Coupon = require("../model/Coupon");
const catchasync = require("../middleware/catchasync");

exports.RegisterUser = catchasync(async (req, res) => {
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
        
        res.status(400).json({error : "user Is Not Register",error})
    }
})

exports.LoginUser = catchasync(async (req, res) => {
    try {
        const { Email , Password } = req.body;
        console.log(Email , Password)
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
                    // httpOnly: true
                  });
                console.log(token)
                res.cookie("token",token , {
                    httpOnly: true
                });
                res.status(200).json({message : "User Is Matched With This Credential " , FindUser , token})
                return
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "User Is Not Matched With This Credential " })
    }
})

// exports.adminLogin = async(req,res)

exports.LogoutUser = async (req, res) => {
    try {
        // console.log(req.UserId)
        const Users = req.UserId;

        res.clearCookie('token' , {
            expiresIn : Date.now()
        });

        res.status(200).json({message : "User logout " , Users })
    } catch (error) {
        console.log(error)
        res.status(400).json({message : "User cannot logout " })
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const newUserData = {
            Name: req.body.Name,
            Email: req.body.Email,
            Contact : req.body.Contact,
            Password : req.body.Password, 
            Pincode : req.body.Pincode , 
            Pancard : req.body.Pancard , 
            Aadharcard : req.body.Aadharcard , 
            Address : req.body.Address, 
            State : req.body.State , 
            City : req.body.City, 
            Vehical_Modal : req.body.Vehical_Modal , 
            Bike_Register_No : req.body.Bike_Register_No, 
            Medical_Certificate : req.body.Medical_Certificate , 
            Puc_Certificate : req.body.Puc_Certificate , 
            Bike_Insurance_Policy : req.body.Bike_Insurance_Policy, 
            Vehicle_image : req.body.Vehicle_image, 
            Role : req.body.Role, 
            Status : req.body.Status
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
    }

}

// forget password
// exports.forgotPassword = async (req, res, next) => {
//     const userEmail = await User.findOne({ Email: req.body.Email })

//     if (!userEmail) {
//         return next(res.status(400).json({ message: "Inavlid email" }))
//     }

//     console.log(userEmail)
//     // function getResetpasswordToken() {

//     //     console.log(resetToken, 'r')
//     //     resetpasswordExpire = Date.now() + 30 * 60 * 1000
//     // }
//     // const resetToken = (Math.random() + 1).toString(36).substring(7)
//     // const resetpasswordExpire = Date.now() + 30 * 60 * 1000
//     // console.log(resetToken)
//     if (userEmail) {
//         // const token = userEmail.reset()
//         // console.log(token)
//         await userEmail.save({ validateBeforeSave: false })

//         // const resetUrl = `${req.protocol}://${req.get('host')}/api/password/reset/${token}`;

//         // const message = `your password reset token is followed:\n ${resetUrl}\n if you are not please ingonre`
//         const message = `your password reset token is followed: if you are not please ingonre`
//         console.log(message)
//         try {
//             await sendEmail({
//                 email: req.body.Email,
//                 subject: "password reset ",
//                 message
//             })
//             console.log(req.body.Email, 'emal')
//             res.status(200).json({ message: "email send sucessfully" })
//         } catch (err) {

//             User.getResetpasswordToken = undefined;
//             User.resetpasswordExpire = undefined;
//             await userEmail.save({ validateBeforeSave: false })
//             console.log(err)
//             res.status(400).json({ message: "error while sending email", err })
//         }
//         return;
//     }

// }

// // reset password
// exports.resetPassword = async (req, res, next) => {
//     try {
//         const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

//         const user = await User.findOne({
//             resetPasswordToken,
//             resetpasswordExpire: { $gt: Date.now() }
//         })
//         if (!user) {
//             return next(res.status(400).json({ mesage: "password token invalid or expried", }))
//         }
//         if (!req.body.password == req.body.confirmpassword) {
//             return next(res.status(400).json({ message: "password and confirm password dont match" }))
//         }
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(req.body.password, salt);
//         console.log('password', user.password)
//         user.resetpassword = undefined;
//         user.resetpasswordExpire = undefined;


//         await user.save()
//         res.status(200).json({ message: "password reset ,!go back and login", resetPasswordToken })
//     } catch (err) {
//         console.log(err)
//         res.status(400).json({ message: "token invalid ! something went wrong" })
//     }
// }


exports.GetAllUser = catchasync(async (req, res) => {
    try {
        
        const FindUsers = await User.find();
        var count;

        if (!FindUsers) {
            res.status(400).json({error : "All User Not FOund"})
            return
        }
        
        if (FindUsers) {
            res.status(200).json({message : "Users FOund" , count : FindUsers.length , FindUsers})
            return
        }
    } catch (error) {
        res.status(400).json({error : "All User Is Not FOund"})
    }
})

exports.GetAllUserWithCoupen = catchasync(async (req, res) => {
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
})

exports.activateDelivery = catchasync(async (req, res) => {
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
})