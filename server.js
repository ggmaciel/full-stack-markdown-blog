const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("config");
const path = require("path");

//Body-Parser
app.use(express.json());

//Database config
const db = config.get("mongoURI");

//Mongo Connection
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

//Routes
app.use("/api/users", require("./routes/api/register")); //Register
app.use("/api/auth", require("./routes/api/auth")); //Login,Get User
app.use("/api/articles", require("./routes/api/articles")); //Post Article, Get user articles, like article

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(port, () => console.log(`Server Started on port ${port}`));
