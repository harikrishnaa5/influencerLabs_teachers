const router = require("express").Router();
const teacherModel = require("../model/teacher");

//get all teachers
router.get("/", async (req, res) => {
    try {
        const data = await teacherModel.find().lean();
        if (data) res.status(200).json(data);
        else res.status(404).json({ message: "no data available" });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
});

//get a teacher
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const teacher = await teacherModel.findById({ _id: id });
        if (!teacher) res.status(404).json({ message: "this teacher doesnot exist" });
        else res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
});
//add a new teacher
router.post("/add", async (req, res) => {
    const name = req.body.name;
    console.log(req.body);
    try {
        let existingTeacher = await teacherModel.findOne({ name: name });
        if (!existingTeacher) {
            const data = new teacherModel({
                name: req.body.name,
                subject: req.body.subject,
            });
            const response = await data.save();
            res.status(200).json(response);
        } else {
            res.status(403).json({ message: "teacher already exists" });
        }
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
});

//update a teacher's details
router.patch("/:id", async (req, res) => {
    const id = req.params.id;

    const { name, subject } = req.body;
    try {
        const teacher = await teacherModel.updateOne(
            { _id: id },
            {
                $set: {
                    name,
                    subject,
                },
            }
        );

        if (teacher.nModified === 0) {
            return res.status(404).json({ error: "Teacher not found or no modifications were made" });
        }
        res.json({ message: "Teacher updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
});

//delete a teacher
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deleteTeacher = await teacherModel.deleteOne({ _id: id });
        if (deleteTeacher.deletedCount === 0) {
            return res.status(404).json({ error: "Teacher not found or no deletions were made" });
        }

        res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    }
});

module.exports = router;
