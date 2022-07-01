const Attendance = require("../model/attendance");

exports.WorkStart = async (req, res) => {
    try {
        const { UserId , DailyClock , TotalHours } = req.body;
        const findiduser = await Attendance.findOne({UserId : UserId});
        let Hours = TotalHours;
        let Clockin = DailyClock.ClockIn.split(" ")[0];
        let Clockout = DailyClock.ClockOut.split(" ")[0];
        console.log(Clockin)
        console.log(parseInt(Clockin))

        if (findiduser) {
            const UpateUserTime = await Attendance.updateOne({UserId : findiduser.UserId} , {
                 $push: { DailyClock: {
                    "ClockIn" :  DailyClock.ClockIn,
                    "ClockOut" : ""
                 }} 
            } , {new : true})

            
            
            if (UpateUserTime) {
                res.status(200).json({message : "User is Updated " , UpateUserTime})
                return
            }
        }
        const createattendance = await Attendance.create({UserId , DailyClock , TotalHours});

        if (!createattendance) {
            res.status(400).json({error : "We cannot update clock in time in try"})
            return
        }

        if (createattendance) {
            res.status(200).json({message : "Your Time Start Now " , createattendance})
            return
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : "We cannot update clock in time "})
    }
}

exports.GetAllTime = async (req, res) => {
    try {
        const gettime = await Attendance.find();

        if (!gettime) {
            res.status(400).json({error : "We Cannot Get All Time in try "})
            return
        }

        if (gettime) {
            res.status(200).json({message : "We Get All Time " , gettime})
            return
        }
    } catch (error) {
        res.status(400).json({error : "We Cannot Get All Time "})
    }
}

exports.GetAllTimeById = async (req, res) => {
    try {
        const gettime = await Attendance.find({UserId : req.params.id});

        if (!gettime) {
            res.status(400).json({error : "We Cannot Get All Time in try "})
            return
        }

        if (gettime) {
            res.status(200).json({message : "We Get All Time " , gettime})
            return
        }
    } catch (error) {
        res.status(400).json({error : "We Cannot Get All Time "})
    }
}

exports.UpdateTime = async (req, res) => {
    try {

        const { UserId , ClockIn , ClockOut , TotalHours } = req.body;

        const UpdateUserTime = await Attendance.findById(req.params.id);

        if (!UpdateUserTime) {
            res.status(400).json({error : "We Cannot Update All Time in try"})
            return
        }
        
        if (UpdateUserTime) {
            
            const UpdateUser = await Attendance.findByIdAndUpdate(req.params.id , {
                UserId : UserId ,
                ClockIn : ClockIn,
                ClockOut : ClockOut,
                TotalHours : TotalHours
            });
            
            if (!UpdateUser) {
                res.status(400).json({error : "We Cannot Update All Time in try and try"})
                return
            }
            
            if (UpdateUser) {
                res.status(200).json({message : "We  Update  Time " , UpdateUser})
                return
            }

        }
    } catch (error) {
        res.status(400).json({error : "We Cannot Update All Time "})
    }
}

exports.ClockoutUpdate = async (req, res) => {
    try {
        const { UserId , DailyClock , TotalHours } = req.body;

        const findUser = await Attendance.find({UserId : UserId});

        if (!findUser) {
            res.status(400).json({error : "Clockout is not possible in try  "})
            return 
        }
        console.log(findUser)
        if (findUser) {
            try {
                const data = findUser[0].DailyClock[DailyClock.length - 1];
                console.log(data , "data")
                // 62bc602ca43e694c7e1afec2
                const Updateclockout = await Attendance.findByIdAndUpdate(findUser[0]._id , {
                    $set: {
                        "DailyClock.-1.ClockOut": DailyClock.ClockOut
                    }
                    // DailyClock : {
                    //     ClockOut : DailyClock[DailyClock.length - 1].ClockOut = DailyClock.ClockOut
                    // }
                } , {new : true})
                console.log(Updateclockout)
                if (!Updateclockout) {
                    res.status(400).json({error : "Clockout is not possible in try in try  "})
                    return
                }
            
                if (Updateclockout) {
                    res.status(200).json({message : "Clockout is Updated  " , Updateclockout})
                    return
                }
            } catch (error) {
                console.log(error)
            }
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : "Clockout is not possible  "})
    }
}

exports.DeleteTime = async (req, res) => {
    try {
        
        const FindUserDelete = await Attendance.findById(req.params.id);

        if (!FindUserDelete) {
            res.status(400).json({error : "We Cannot Delete The time in try"})
            return
        }
        
        if (FindUserDelete) {

            const DeleteTime = await Attendance.findOneAndDelete(req.params.id);

            if (!DeleteTime) {
                res.status(200).json({message : "We Cannot Delete The time in try in try."})
                return
            }
            
            if (DeleteTime) {
                res.status(200).json({message : "TIme Is deleted" , DeleteTime})
                return
            }

        }

    } catch (error) {
        res.status(400).json({error : "We Cannot Delete The time"})
    }
}