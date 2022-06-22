const mongoose = require("mongoose");
const Coupon = require("../model/Coupon");
const User = require("../model/User");
const catchasync = require("../middleware/catchasync");

exports.GenerateCouponCode = catchasync(async (req, res) => {
  try {
    const { Start_Date, End_Date, Status, Code } = req.body;
    let Coupons = await Coupon.create({
      Start_Date,
      End_Date,
      Status,
      Code,
    });

    if (!Coupons) {
      res
        .status(400)
        .json({ error: "We Unable To Generate Code With This Information " });
      return;
    }

    if (Coupons) {
      await Coupons.save();
      let AllUser = await User.find();
      console.log(AllUser)
      // for (let i = 0; i < AllUser.length; i++) {
      const UpdateId = await User.findByIdAndUpdate(AllUser._id,
        {
          $push: {
            "CouponCodes": { code_id: Coupons._id, Status: true },
          }
        }, { new: true }
      );
      console.log(UpdateId);
    }
    // res.status(200).json({message : "We Doest find any user for Adding coupon code"})
    // return

    res.status(200).json({ message: "Code Is Generaed", Coupons });
    return;
    // }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "We Unable To Generate Code " });
  }
})


exports.ApplyCoupenCode = catchasync(async (req, res) => {
  try {
    const CheckUser = await User.findById(req.params.id);

    if (!CheckUser) {
      res.status(400).json({ message: "unble to find user" })
      return
    }

    if (CheckUser) {
      const CheckCoupen = await Coupon.findById(req.body.id)
      if (!CheckCoupen) {
        res.status(400).json({ message: "This Coupen Doesnot exist" })
        return
      }

      if (CheckCoupen) {
        const CheckCoupounstatus = await User.findById(req.params.id)
        // const id = req.body.id
        let dataArray = []
        if (CheckCoupounstatus) {
          console.log(typeof (CheckCoupounstatus.CouponCodes));
          // CheckCoupounstatus.CouponCodes && CheckCoupounstatus.CouponCodes.map(e=>{
          //   console.log(e);
          // })
          dataArray.push(CheckCoupounstatus.CouponCodes)
          console.log(CheckCoupounstatus.CouponCodes.code_id);
          // dataArray = CheckCoupounstatus.CouponCodes
          if (CheckCoupounstatus.CouponCodes.code_id.toString() === req.body.id && CheckCoupounstatus.CouponCodes.Status.toString() === 'false') {
            console.log('checked status')
            res.status(400).json({ message: "this coupun already applied " })
            return
          }
          const UserCoupen = await User.findByIdAndUpdate(CheckUser._id, {
            CouponCodes: [
              {
                code_id: req.body.id,
                Status: false

              }
            ]
          }, { new: true })

          if (!UserCoupen) {
            res.status(400).json({ message: "Coupen is not updated" })
            return
          }

          if (UserCoupen) {
            res.status(200).json({ message: "Coupen Apply Succesfully", UserCoupen })
            return
          }
          return
        }
      }
      return
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "We Unable To Generate Code " });
  }
})



