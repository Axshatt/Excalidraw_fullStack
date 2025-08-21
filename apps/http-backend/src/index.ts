import express from "express";
import {JWT_PASS} from "@repo/backend-common/config";
import jwt from "jsonwebtoken";
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
const app = express();
app.use(express.json())
const client = prismaClient();
app.post("/signup", async (req, res) => {

    const { username, password } = req.body;
    const parseData = CreateUserSchema.safeParse(req.body);

    if (!parseData.success) {
        res.json({
            message: "Incorrect Inputs"
        })

    }
    try{

        const user = await client.user.create({
            data:{
                email:parseData.data?.username,
                password:parseData.data?.password,
                name:parseData.data?.name
            }
            
        })
        res.json({
            userId:user.id
        })


    }catch(e){
        res.status(411).json({
            message:"User Already Exists"
        })

    }


})

app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const parseData = SignInSchema.safeParse(req.body);

    if (!parseData.success) {
        res.json({
            message: "Incorrect Inputs"
        })
        return;
    }

    const response = await client.user.findFirst({
        where:{
            username:parseData.data?.username
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