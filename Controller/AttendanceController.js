const Attendance = require("../model/attendance");

exports.WorkStart = async (req, res) => {
    try {
        const { UserId , ClockIn , ClockOut , HalfDays , TotalHours , Remarks , IsRegularization , Date } = req.body;
        // ClockIn = new Date.now();
        // console.log(Date.now())
        const createattendance = await Attendance.create({UserId , ClockIn  , ClockOut , HalfDays , TotalHours , Remarks , IsRegularization , Date});

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

        const { UserId , ClockIn , ClockOut , HalfDays , TotalHours , Remarks , IsRegularization , Date } = req.body;

        const UpdateUserTime = await Attendance.findById(req.params.id);

        if (!UpdateUserTime) {
            res.status(400).json({error : "We Cannot Update All Time in try"})
            return
        }
        
        if (UpdateUserTime) {
            
            const UpdateUser = await Attendance.findByIdAndUpdate(req.params.id , {
                UserId , ClockIn , ClockOut , HalfDays , TotalHours , Remarks , IsRegularization , Date
            } , { new : true });
            
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

exports.UpdateCheckout = async (req, res) => {
    try {

        const Updatetime = await Attendance.findById(req.params.id);
        if (!Updatetime) {
            res.status(400).json({error : "unable to find user"})
            return
        }
        
        if (Updatetime) {
            const Clockintime = Updatetime.ClockIn;
            const inhours = Clockintime.getHours();
            const inminute = Clockintime.getMinutes();
            console.log(Clockintime.getHours() , 'Clockintime Hours')
            console.log(Clockintime.getMinutes() , 'Clockintime')
            // console.log(Clockintime.getSeconds())
            const Clockouttime = Date.now()
            const convertdate = new Date(Clockouttime);
            const outhours = convertdate.getHours();
            const outminutes = convertdate.getMinutes();

            const calculatehours = outhours - inhours;
            const calculateminutes = inminute - outminutes;
            console.log(convertdate.getHours() , 'Clockouttime Hours')
            console.log(convertdate.getMinutes() , 'Clockouttime minutes')
            
            console.log(calculatehours , 'calculate hours')
            console.log(calculateminutes , 'calculate minutes')
            const time = `${calculatehours}:${calculateminutes}`;

            const UpdateAttendance = await Attendance.findByIdAndUpdate(req.params.id , {
                ClockOut : Clockouttime,
                TotalHours : time
            } , {new : true})

            if (!UpdateAttendance) {
                res.status(400).json({error : "unable to find user for update"})
                return
            }

            if (UpdateAttendance) {
                res.status(200).json({message : "Clock out time updated" , UpdateAttendance})
                return
            }

            return
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error : "Unable to update clock out time "});
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