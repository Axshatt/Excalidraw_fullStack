import express from "express";
import JWT_PASS from "./config";
import jwt  from "jsonwebtoken";


const app = express();

app.post("/signup", (req, res) => {

    const { username, password } = req.body;




})

app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        try {
            const token = jwt.sign({
                username
            }, JWT_PASS);

            res.json({
                token
            })
        } catch (err) {
            console.log(err);

        }
    }
})