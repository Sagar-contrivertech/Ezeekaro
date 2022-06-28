const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require('crypto')

const User = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Contact: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Pincode: {
    type: String,
    // required : true
  },
  Pancard: {
    type: String,
    // required : true
  },
  Aadharcard: {
    type: String,
    // required : true
  },
  Address: {
    type: String,
    // required : true
  },
  State: {
    type: String,
    // required : true
  },
  City: {
    type: String,
    // required : true
  },
  Vehical_Modal: {
    type: String,
    // required : true
  },
  Bike_Register_No: {
    type: String,
    // required : true
  },
  Medical_Certificate: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  Puc_Certificate: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  Bike_Insurance_Policy: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  Vehicle_image: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  Permission: {
    type: String,
    // required : true
  },
  Permission: {
    type: String,
    default: "read"
  },
  Role: {
    type: String,
    default: "user", // this going to change
  },
  Status: {
    type: String,
    default: "inactive",
  },
  CouponCodes: {
    code_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Coupon"
    },
    Status: {
      type: String
    }
  },
  resetpassword: String,
  resetpasswordExpire: Date
});

User.methods.Bycryptpassword = async function () {
  if (this.Password) {
    this.Password = await bcrypt.hash(this.Password, 10);
    return this.save();
  }
};

// User.methods.generateAuthToken = async function() {
//     let tokendhaval = jwt.sign({_id : this._id} , process.env.SECRET_KEY);
//     console.log(tokendhaval)
//     this.tokens = this.tokens.concat({token : tokendhaval});
//     await this.save();
//     return tokendhaval;
// }

User.methods.reset = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  console.log(resetToken);
  this.resetpassword = crypto.createHash('sha256').update(resetToken).digest('hex')
  console.log(this.resetpassword);
  this.resetpasswordExpire = Date.now() + 30 * 60 * 1000
  return resetToken;
}

// compare password methods
User.methods.comparePassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password)
}

module.exports = mongoose.model("User", User);
