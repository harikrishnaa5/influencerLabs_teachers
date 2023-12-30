const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
})

const teacherModel = mongoose.model("teachers", teacherSchema)
module.exports = teacherModel