const Users = require('../model/User')
const catchasync = require("../middleware/catchasync");

exports.changePermission = catchasync(async (req, res) => {
    try {
        const users = await Users.findById(req.params.id)
        if (!users) {
            res.status(400).json({ message: "cannot update permission" })
            return;
        }
        if (users) {
            const chnagepermissions = await Users.findByIdAndUpdate(req.params.id, {
                Permissions: req.body.Permissions
            }, { new: true })
            if (chnagepermissions) {
                res.status(200).json({ message: "permission for user set sucessfulyy!" })
                return
            }
            return
        }
    } catch (err) {
        res.status(500).json({ message: "somethimg went wrong !" })
        console.log(err)
    }
})