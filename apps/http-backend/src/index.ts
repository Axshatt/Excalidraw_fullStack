import express from "express";
import JWT_PASS from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"

const app = express();
const client = prismaClient();
app.post("/signup", async (req, res) => {

    const { username, password } = req.body;
    const data = CreateUserSchema.safeParse(req.body);

    if (!data.success) {
        res.json({
            message: "Incorrect Inputs"
        })

    }
    const user = await client.user.create({
        username,
        password
    })

    return res.json({
        userId: user._id
    })




})

app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const data = SignInSchema.safeParse(req.body);

    if (!data.success) {
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }

    const response = await client.user.findFirst({
        where:{
            username:username
        },
    })
    if(!response){
        if(username && password) {
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
        
    }
    return res.json({
            msg:"User already exists"
        })


    
})

app.get("/room", (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);

    if (!data.success) {
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }


})
app.listen(3001)