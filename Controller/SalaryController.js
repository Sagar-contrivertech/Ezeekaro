const mongoose = require("mongoose")
const EmpSalary = require("../model/salary");

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

        const salarys = await EmpSalary.find();

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

        const salarys = await EmpSalary.find({UserId : req.params.id});

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