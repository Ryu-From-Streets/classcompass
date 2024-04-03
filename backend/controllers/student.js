const Student = require("../models/student");

async function handleCreateStudent(req, res) {
    const body = req.body;
    if (!body||
        !body.first_name ||
        !body.email ||
        !body.credits ||
        !body.courses_taken) {
        return res.status(400).json({ message: "Missing required information" });
    }

    const result = await Student.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        credits: body.credits,
        courses_taken: body.courses_taken,
        password: body.password,
    });

    return res.status(201).json({ msg: "Success", id: result._id });
}