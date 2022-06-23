const mongoose = require("mongoose")

mongoose.connect(process.env.Dev).then(() => {
    console.log("DataBase Connected")
}).catch((err) => {
    console.log(err)
    console.log("DataBase Is Not Connected")
})