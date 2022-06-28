const Attendance = require("../model/attendance");

exports.WorkStart = async (req, res) => {
    try {
        const { UserId , ClockIn , ClockOut , TotalHours } = req.body;

        const createattendance = await Attendance.create({UserId , ClockIn , ClockOut , TotalHours});

        if (!createattendance) {
            res.status(400).json({error : "We cannot update clock in time in try"})
            return
        }

        if (createattendance) {
            res.status(200).json({message : "Your Time Start Now " , createattendance})
            return
        }

    } catch (error) {
        res.status(400).json({error : "We cannot update clock in time "})
    }
}