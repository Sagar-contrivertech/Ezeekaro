const mongoose = require("mongoose");
const attendance = require("../model/attendance");
const EmpSalary = require("../model/salary");
const Monthlysalary = require("../model/monthlysalary")

exports.AddSalary = async (req, res) => {
    try {
        const { UserId , Salary } = req.body;

        const salarys = await EmpSalary.create({ UserId , Salary });

        if (!salarys) {
            res.status(400).json({error : "Unable to add salary in try"})
            return
        }
        
        if (salarys) {
            res.status(200).json({message : "Add Salary Succesfully" , salarys})
            return
        }


    } catch (error) {
        res.status(400).json({error : "Unable to add salary"})
    }
}

exports.GetSalary = async (req, res) => {
    try {

        const salarys = await EmpSalary.find().populate("UserId");

        if (!salarys) {
            res.status(400).json({error : "Unable to find salary in try"})
            return
        }
        
        if (salarys) {
            res.status(200).json({message : "find Salary Succesfully" , salarys})
            return
        }

    } catch (error) {
        res.status(400).json({error : "Unable to find salary"})
    }
}

exports.GetSalaryById = async (req, res) => {
    try {

        const salarys = await EmpSalary.find({UserId : req.params.id}).populate("UserId");

        if (!salarys) {
            res.status(400).json({error : "Unable to find salary in try"})
            return
        }
        
        if (salarys) {
            res.status(200).json({message : "find Salary Succesfully" , salarys})
            return
        }

    } catch (error) {
        res.status(400).json({error : "Unable to find salary"})
    }
}

exports.UpdateSalary = async (req, res) => {
    try {

        const { UserId , Salary } = req.body;

        const salarys = await EmpSalary.findById(req.params.id);

        if (!salarys) {
            res.status(400).json({error : "Unable to find salary in try"})
            return
        }
        
        if (salarys) {

            const UpdateSalary = await EmpSalary.findByIdAndUpdate(req.params.id , {
                UserId : UserId,
                Salary : Salary
            } , {new : true})

            if (!UpdateSalary) {
                res.status(400).json({error : "unable find Salary for update" })
                return
            }

            if (UpdateSalary) {
                res.status(200).json({message : "salary Updated" , UpdateSalary })
                return
            }
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : "Unable to find salary"})
    }
}

exports.DeleteSalary = async (req, res) => {
    try {

        const salarys = await EmpSalary.findById(req.params.id);

        if (!salarys) {
            res.status(400).json({error : "Unable to find salary in try for delete"})
            return
        }
        
        if (salarys) {

            const DeleteSalary = await EmpSalary.findByIdAndDelete(req.params.id)

            if (!DeleteSalary) {
                res.status(400).json({error : "unable find Salary for Deleted" })
                return
            }

            if (DeleteSalary) {
                res.status(200).json({message : "salary Deleted" , DeleteSalary })
                return
            }
        }

    } catch (error) {
        res.status(400).json({error : "Unable to find salary for delete"})
    }
}

exports.calculatesalary = async (req, res) => {
    try {
        const findtime = await attendance.find({UserId : req.params.id})
        const findsalary = await EmpSalary.findOne({UserId : req.params.id})
        const days = req.params.days;
        console.log(days)
        if (!findtime && !findsalary) {
            res.status(400).json({error : "Unable to find calculate salary"})
            return
        }

        if (findtime && findsalary) {
            const perday = (findsalary.Salary/days)/8;
            const hours = parseInt(findtime[0].TotalHours.split(":")[0]);
            const minute = parseInt(findtime[0].TotalHours.split(":")[1]);
            let totalhours = `${hours}.${minute}`
            if (minute > 30) {
                totalhours = Math.ceil(totalhours);
            }else{
                totalhours = Math.floor(totalhours);
            }
            console.log(totalhours)
            const salary = (perday*totalhours);

            // console.log(typeof salary + salary) 
            const Addsalary = await Monthlysalary.create({UserId : findtime[0].UserId , SalaryId : findsalary._id , Salary : Math.trunc(salary)})

            if (!Addsalary) {
                res.status(400).json({message : "Monthly salary is not added" })
                return
            }
            
            if (Addsalary) {

                res.status(200).json({message : "Monthly salary is  added" , Addsalary })
                return
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error : "Unable to calculate salary"})
    }
}


exports.GetAllMonthlySalary = async (req, res) => {
    try {
        const getallsalary = await Monthlysalary.find({UserId : req.params.id}).populate("UserId").populate("SalaryId");

        if (!getallsalary) {
            res.status(400).json({error : "Not Found Monthly salary"})
            return
        }

        if (getallsalary) {
            res.status(200).json({message : "All Salary Found Of MOnthly " , getallsalary })
            return
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : "Unable to get monthly calculate salary"})
    }
}