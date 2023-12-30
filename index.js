//teacher

const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const teacherController = require('./controller/teacher')

const app = express()
const PORT = 8000
const cors = require("cors")

//database connection

mongoose.connect(process.env.MONGO_URI), ()=> {
    console.log("connected to db");
}


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use("/teacher", teacherController)


app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
})