const mongoose = require("mongoose")

mongoose.connect(process.env.Dev).then(() => {
    console.log("DataBase Connected")
}).catch(() => {
    console.log("DataBase Is Not Connected")
})