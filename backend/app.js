const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).send("Welcome to the root URL of Server");
});

app.listen(PORT, (error) => {
    if (!error)
        console.log(
            `ClassCompass is successfully running, and the app is listening on port ${PORT}`
        );
    else console.log("Error occurred, server can't start", error);
});
