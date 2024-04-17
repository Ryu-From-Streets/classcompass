const Advisor = require("../models/advisor");

async function handleCreateAdvisor(req, res) {
    const body = req.body;
    if (!first_name || !email || !password) {
        return res
            .status(400)
            .json({ message: "Missing required information" });
    }

    const result = await Advisor.create({
        first_name: body.first_name,
        last_name: last_name || "",
        email: body.email,
        password: body.password,
    });

    return res.status(201).json({ msg: "Success", id: result._id });
}

async function handleSignIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await Advisor.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.status(200).json({ message: "Sign-in successful", user });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
}

module.exports = { handleCreateAdvisor, handleSignIn };
