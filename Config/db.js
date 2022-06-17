const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/EzzeeKaro").then(() => {
    console.log("DataBase Connected")
}).catch(() => {
    console.log("DataBase Is Not Connected")
})